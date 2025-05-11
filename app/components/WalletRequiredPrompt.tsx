"use client";

import React from "react";
import { useMetaMask } from "../hooks/useMetaMask";
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface WalletRequiredPromptProps {
  onWalletConnected?: () => void;
}

export const WalletRequiredPrompt: React.FC<WalletRequiredPromptProps> = ({
  onWalletConnected,
}) => {
  const { isConnected } = useMetaMask();

  if (isConnected) {
    return null; // Don't show anything if already connected
  }

  return (
    <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
      <h4 className="font-semibold text-blue-800 mb-2">
        Wallet Connection Required
      </h4>
      <p className="text-sm text-blue-700 mb-3">
        This action requires a connected wallet. Please connect your MetaMask
        wallet to continue.
      </p>
      <ConnectButton />
    </div>
  );
};
