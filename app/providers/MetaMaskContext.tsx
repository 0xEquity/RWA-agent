'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useMetaMask } from '../hooks/useMetaMask';

// Define the context type
interface MetaMaskContextType {
  account: string | null;
  address: string | null; 
  chainId: number | null;
  isConnected: boolean;
  error: string | null;
  isMetaMaskInstalled: boolean;
  connectWallet: () => Promise<{ address: string; chainId: number } | null>;
  disconnectWallet: () => Promise<boolean>; // Updated to match the actual return type
}

// Create context with a default value
const MetaMaskContext = createContext<MetaMaskContextType | undefined>(undefined);

// Provider component
export function MetaMaskProvider({ children }: { children: ReactNode }) {
  const metamask = useMetaMask();

  return (
    <MetaMaskContext.Provider value={metamask}>
      {children}
    </MetaMaskContext.Provider>
  );
}

// Custom hook for using the context
export function useMetaMaskContext() {
  const context = useContext(MetaMaskContext);
  if (context === undefined) {
    throw new Error('useMetaMaskContext must be used within a MetaMaskProvider');
  }
  return context;
}