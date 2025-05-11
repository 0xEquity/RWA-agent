import { useDisconnect } from "wagmi";
import { useMetaMask } from "../hooks/useMetaMask";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const ConnectWallet = () => {
  const { account, chainId, isConnected } = useMetaMask();

  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [showDisconnectInfo, setShowDisconnectInfo] = useState(false);
  const { disconnectAsync } = useDisconnect();
  // Helper function to format network name from chainId
  const getNetworkName = (id: number | null) => {
    if (!id) return "Unknown network";

    const networks: Record<number, string> = {
      1: "Ethereum Mainnet",
      5: "Goerli Testnet",
      11155111: "Sepolia Testnet",
      8453: "Base Mainnet",
      84531: "Base Goerli Testnet",
      84532: "Base Sepolia Testnet",
      137: "Polygon Mainnet",
      80001: "Polygon Mumbai",
      42161: "Arbitrum One",
      421613: "Arbitrum Goerli",
    };

    return networks[id] || `Chain ID: ${id}`;
  };

  // Handle disconnect with loading state and information display
  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    try {
      await disconnectAsync();
      // Show disconnect info after successfully clearing app state
      setShowDisconnectInfo(true);
      // Hide info after 5 seconds
      setTimeout(() => {
        setShowDisconnectInfo(false);
      }, 5000);
    } finally {
      setIsDisconnecting(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      {showDisconnectInfo && (
        <div className="text-xs text-amber-500 bg-amber-50 border border-amber-200 p-2 rounded max-w-xs text-center">
          Your wallet has been disconnected from this application. Note that
          MetaMask may still show this site as connected in its interface.
        </div>
      )}

      {!isConnected ? (
        <ConnectButton />
      ) : (
        <div className="flex flex-col gap-2 items-center">
          <div className="text-sm flex items-center">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            <span>
              {account?.slice(0, 6)}...{account?.slice(-4)}
            </span>
          </div>

          <div className="text-xs text-gray-500">{getNetworkName(chainId)}</div>

          <button
            onClick={handleDisconnect}
            disabled={isDisconnecting}
            className={`text-xs ${isDisconnecting ? "text-gray-400" : "text-red-500 hover:text-red-700"}`}
          >
            {isDisconnecting ? "Disconnecting..." : "Disconnect"}
          </button>
        </div>
      )}
    </div>
  );
};
