/* eslint-disable */
import { useState, useEffect, useCallback } from 'react';
import { useMetamaskJotai } from '../atoms/metamask.jotai';
import { ethers } from 'ethers';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useMetaMask = () => {
  const {
    address: storedAddress,
    chainId: storedChainId,
    isConnected: storedIsConnected,
    error: storedError,
    setAddress,
    setChainId,
    setIsConnected,
    setError,
    disconnect
  } = useMetamaskJotai();

  // Check if MetaMask is installed
  const isMetaMaskInstalled = typeof window !== 'undefined' && Boolean(window.ethereum?.isMetaMask);

  // Sync session with backend
  const syncSessionWithBackend = useCallback(async (address: string | null, chainId: number | null) => {
    try {
      if (address && chainId) {
        // Create or update session
        const response = await fetch('/api/auth/wallet-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ walletAddress: address, chainId }),
          credentials: 'include', // Important for cookies
        });
        
        if (!response.ok) {
          throw new Error('Failed to sync wallet session with backend');
        }
      } else {
        // Clear session if disconnected
        await fetch('/api/auth/wallet-session', {
          method: 'DELETE',
          credentials: 'include',
        });
      }
    } catch (err) {
      console.error('Session sync error:', err);
      // Don't set UI error for background sync failures
    }
  }, []);

  // Check current wallet connection on initial load
  const checkConnection = useCallback(async () => {
    if (!isMetaMaskInstalled) return;
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Get accounts (returns empty array if not connected)
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        const address = accounts[0].address;
        const network = await provider.getNetwork();
        const chainId = Number(network.chainId);
        
        setAddress(address);
        setChainId(chainId);
        setIsConnected(true);
        
        // Sync with backend session
        syncSessionWithBackend(address, chainId);
      } else {
        disconnect();
      }
    } catch (err) {
      console.error('Connection check failed:', err);
      // Silent fail for initial check
    }
  }, [isMetaMaskInstalled, setAddress, setChainId, setIsConnected, disconnect, syncSessionWithBackend]);

  // Connect wallet
  const connectWallet = async () => {
    if (!isMetaMaskInstalled) {
      setError('MetaMask is not installed');
      return null;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Request accounts (triggers MetaMask popup)
      const accounts = await provider.send('eth_requestAccounts', []);
      const address = accounts[0];
      
      // Get current network
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);
      
      // Update state
      setAddress(address);
      setChainId(chainId);
      setIsConnected(true);
      setError(null);
      
      // Sync with backend
      await syncSessionWithBackend(address, chainId);
      
      return { address, chainId };
    } catch (err: any) {
      // Handle user rejection or other errors
      const errorMessage = err.message || 'Failed to connect wallet';
      setError(errorMessage);
      return null;
    }
  };

  // Disconnect wallet - Improved implementation with explanation
  const disconnectWallet = useCallback(async () => {
    try {
      console.log('Disconnecting wallet...');
      
      // First clear the backend session
      const response = await fetch('/api/auth/wallet-session', {
        method: 'DELETE',
        credentials: 'include',
      });
      
      if (!response.ok) {
        console.error('Failed to clear wallet session');
      } else {
        console.log('Wallet session cleared successfully');
      }
      
      // Then clear local state
      disconnect();
      
      // Note: MetaMask doesn't provide a way to programmatically disconnect a site
      // from their extension. The user would need to manually disconnect from the
      // MetaMask extension UI by going to:
      // Connected Sites > This site > Disconnect
      //
      // What we can do is inform the user:
      console.log('Note: To fully disconnect MetaMask, you may also need to disconnect this site from your MetaMask extension.');
      
      // As a workaround, we can force the disconnect event by requesting accounts and rejecting
      // but this is not reliable across all browsers/versions of MetaMask
      try {
        if (window.ethereum) {
          // This will trigger a popup that the user can cancel, effectively "disconnecting" 
          // but this is not ideal UX and doesn't truly revoke permissions
          const provider = new ethers.BrowserProvider(window.ethereum);
          await provider.send('eth_requestAccounts', []).catch(() => {
            // User rejecting this request is actually what we want here
            console.log('User rejected connection request (expected during disconnect)');
          });
        }
      } catch (e) {
        // Ignore errors here, we're just trying to trigger the disconnect flow
      }
      
      console.log('Wallet disconnected (application state)');
      return true;
    } catch (err) {
      console.error('Error disconnecting wallet:', err);
      setError('Failed to disconnect wallet');
      return false;
    }
  }, [disconnect, setError]);

  // Set up event listeners
  useEffect(() => {
    if (!isMetaMaskInstalled) return;
    
    // Check connection on initial load
    checkConnection();
    
    // Handle account changes
    const handleAccountsChanged = async (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected from MetaMask
        disconnect();
        await syncSessionWithBackend(null, null);
      } else {
        const newAddress = accounts[0];
        setAddress(newAddress);
        // Maintain connected status and chainId, just update the address
        if (storedChainId) {
          await syncSessionWithBackend(newAddress, storedChainId);
        }
      }
    };
    
    // Handle chain changes
    const handleChainChanged = async (chainIdHex: string) => {
      const newChainId = parseInt(chainIdHex, 16);
      setChainId(newChainId);
      
      // Sync with backend if we have an address
      if (storedAddress) {
        await syncSessionWithBackend(storedAddress, newChainId);
      }
    };
    
    // Handle disconnect events
    const handleDisconnect = async (error: { code: number; message: string }) => {
      console.log('MetaMask disconnect event', error);
      disconnect();
      await syncSessionWithBackend(null, null);
    };

    // Subscribe to events
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    window.ethereum.on('disconnect', handleDisconnect);
    
    // Cleanup
    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      }
    };
  }, [isMetaMaskInstalled, checkConnection, disconnect, syncSessionWithBackend, storedAddress, storedChainId, setAddress, setChainId]);

  // Returns
  return {
    account: storedAddress, // Kept for backward compatibility
    address: storedAddress,
    chainId: storedChainId,
    isConnected: storedIsConnected,
    error: storedError,
    isMetaMaskInstalled,
    connectWallet,
    disconnectWallet
  };
};