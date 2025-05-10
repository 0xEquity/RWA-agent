'use client';

import React from 'react';
import { useMetaMask } from '../hooks/useMetaMask';

interface WalletRequiredPromptProps {
  onWalletConnected?: () => void;
}

export const WalletRequiredPrompt: React.FC<WalletRequiredPromptProps> = ({ onWalletConnected }) => {
  const { connectWallet, isConnected, error, isMetaMaskInstalled } = useMetaMask();

  const handleConnectWallet = async () => {
    const result = await connectWallet();
    if (result && onWalletConnected) {
      onWalletConnected();
    }
  };

  if (!isMetaMaskInstalled) {
    return (
      <div className="border border-yellow-300 bg-yellow-50 p-4 rounded-md">
        <h4 className="font-semibold text-yellow-800 mb-2">MetaMask Required</h4>
        <p className="text-sm text-yellow-700 mb-3">
          You need to install the MetaMask extension to continue with this operation.
        </p>
        <a
          href="https://metamask.io/download/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded text-sm transition-colors"
        >
          Install MetaMask
        </a>
      </div>
    );
  }

  if (error) {
    return (
      <div className="border border-red-200 bg-red-50 p-4 rounded-md">
        <h4 className="font-semibold text-red-800 mb-1">Connection Error</h4>
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (isConnected) {
    return null; // Don't show anything if already connected
  }

  return (
    <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
      <h4 className="font-semibold text-blue-800 mb-2">Wallet Connection Required</h4>
      <p className="text-sm text-blue-700 mb-3">
        This action requires a connected wallet. Please connect your MetaMask wallet to continue.
      </p>
      <button
        onClick={handleConnectWallet}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded text-sm transition-colors"
      >
        Connect MetaMask
      </button>
    </div>
  );
};