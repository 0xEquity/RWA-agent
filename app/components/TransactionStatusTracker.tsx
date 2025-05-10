'use client';

import React, { useState, useEffect } from 'react';
import { useMetaMask } from '../hooks/useMetaMask';
import { ethers } from 'ethers';

interface Transaction {
  hash: string;
  to: string;
  from: string;
  value: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
  data?: string;
  blockNumber?: number;
  gasUsed?: string;
  error?: string;
}

export const TransactionStatusTracker: React.FC = () => {
  const { isConnected } = useMetaMask();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load transactions from local storage on component mount
  useEffect(() => {
    const loadTransactions = () => {
      try {
        const storedTxs = localStorage.getItem('wallet_transactions');
        if (storedTxs) {
          const parsedTxs: Transaction[] = JSON.parse(storedTxs);
          
          // Sort by timestamp (newest first)
          parsedTxs.sort((a, b) => b.timestamp - a.timestamp);
          setTransactions(parsedTxs);
        }
      } catch (err) {
        console.error('Failed to load transactions:', err);
        setError('Failed to load transaction history');
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  // Save transactions to local storage whenever they change
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('wallet_transactions', JSON.stringify(transactions));
    }
  }, [transactions]);

  // Check status of pending transactions
  useEffect(() => {
    const checkPendingTransactions = async () => {
      if (!window.ethereum || !transactions.length || !isConnected) return;
      
      try {
        // Create a proper ethers BrowserProvider from the ethereum provider
        const browserProvider = new ethers.BrowserProvider(window.ethereum);
        
        // Find all pending transactions
        const pendingTxs = transactions.filter(tx => tx.status === 'pending');
        
        if (!pendingTxs.length) return;
        
        // Check each pending transaction
        const updatedTransactions = [...transactions];
        
        for (const tx of pendingTxs) {
          try {
            const receipt = await browserProvider.getTransactionReceipt(tx.hash);
            
            if (receipt) {
              // Update transaction status
              const txIndex = updatedTransactions.findIndex(t => t.hash === tx.hash);
              if (txIndex !== -1) {
                updatedTransactions[txIndex] = {
                  ...updatedTransactions[txIndex],
                  status: receipt.status ? 'confirmed' : 'failed',
                  blockNumber: Number(receipt.blockNumber),
                  gasUsed: receipt.gasUsed.toString(),
                };
              }
            }
          } catch (err) {
            console.error(`Error checking transaction ${tx.hash}:`, err);
          }
        }
        
        setTransactions(updatedTransactions);
      } catch (err) {
        console.error('Error processing transactions:', err);
      }
    };

    const interval = setInterval(checkPendingTransactions, 15000);
    return () => clearInterval(interval);
  }, [isConnected, transactions]);

  // Add a new transaction to the tracker
  const addTransaction = (tx: Transaction) => {
    setTransactions(prev => [tx, ...prev]);
  };

  // Clear transaction history
  const clearTransactions = () => {
    localStorage.removeItem('wallet_transactions');
    setTransactions([]);
  };

  // Format address for display
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  // Format ETH value
  const formatValue = (value: string) => {
    try {
      return `${ethers.formatEther(value).substring(0, 8)} ETH`;
    } catch {
      return '0 ETH';
    }
  };

  // Get explorer URL for transaction
  const getExplorerUrl = (txHash: string) => {
    // This should be updated based on the network
    return `https://etherscan.io/tx/${txHash}`;
  };

  if (loading) {
    return <div className="flex justify-center py-4">Loading transaction history...</div>;
  }

  if (error) {
    return <div className="text-red-500 py-2">{error}</div>;
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        No transaction history found
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Transaction History</h3>
        <button 
          onClick={clearTransactions}
          className="text-xs text-gray-500 hover:text-gray-700"
        >
          Clear History
        </button>
      </div>

      <div className="space-y-3">
        {transactions.map((tx) => (
          <div key={tx.hash} className="border border-gray-200 rounded-md p-3">
            <div className="flex justify-between items-center mb-2">
              <div className="font-medium">
                {formatAddress(tx.to)}
              </div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                tx.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {tx.status === 'confirmed' ? 'Confirmed' : 
                 tx.status === 'pending' ? 'Pending' : 'Failed'}
              </div>
            </div>
            
            <div className="text-sm text-gray-500 mb-2">
              {new Date(tx.timestamp).toLocaleString()}
            </div>
            
            <div className="flex justify-between items-center">
              <div className="text-sm font-medium">
                {formatValue(tx.value)}
              </div>
              <a 
                href={getExplorerUrl(tx.hash)} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 text-xs hover:underline"
              >
                View on Explorer →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};