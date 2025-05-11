/* eslint-disable */
import { useCallback, useMemo } from "react";
import { useAccount, useChainId } from "wagmi";

declare global {
  interface Window {
    ethereum?: any;
  }
}
export const syncSessionWithBackend = (
  async (address: string | null, chainId: number | null) => {
    try {
      if (address && chainId) {
        // Create or update session
        const response = await fetch("/api/auth/wallet-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ walletAddress: address, chainId }),
          credentials: "include", // Important for cookies
        });

        if (!response.ok) {
          throw new Error("Failed to sync wallet session with backend");
        }
      } else {
        // Clear session if disconnected
        await fetch("/api/auth/wallet-session", {
          method: "DELETE",
          credentials: "include",
        });
      }
    } catch (err) {
      console.error("Session sync error:", err);
      // Don't set UI error for background sync failures
    }
  }
);
export const useMetaMask = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  // Sync session with backend
  

  useMemo(async () => {
    if (!isConnected) {
      await syncSessionWithBackend(null, null);
    }
    if (isConnected && address) {
      await syncSessionWithBackend(address, chainId);
    }
  }, [isConnected, address, chainId]);
  return {
    account: address,
    chainId,
    isConnected
  }
};
