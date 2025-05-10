import { useMetaMask } from '../hooks/useMetaMask';
import { useState } from 'react';

export const ConnectWallet = () => {
  const { 
    account, 
    chainId, 
    isConnected, 
    error, 
    isMetaMaskInstalled, 
    connectWallet,
    disconnectWallet 
  } = useMetaMask();
  
  const [isDisconnecting, setIsDisconnecting] = useState(false);
  const [showDisconnectInfo, setShowDisconnectInfo] = useState(false);

  // Helper function to format network name from chainId
  const getNetworkName = (id: number | null) => {
    if (!id) return 'Unknown network';
    
    const networks: Record<number, string> = {
      1: 'Ethereum Mainnet',
      5: 'Goerli Testnet',
      11155111: 'Sepolia Testnet',
      8453: 'Base Mainnet',
      84531: 'Base Goerli Testnet',
      84532: 'Base Sepolia Testnet',
      137: 'Polygon Mainnet',
      80001: 'Polygon Mumbai',
      42161: 'Arbitrum One',
      421613: 'Arbitrum Goerli',
    };
    
    return networks[id] || `Chain ID: ${id}`;
  };

  // Handle disconnect with loading state and information display
  const handleDisconnect = async () => {
    setIsDisconnecting(true);
    try {
      await disconnectWallet();
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

  if (!isMetaMaskInstalled) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-yellow-500 text-sm">MetaMask not detected</p>
        <a 
          href="https://metamask.io/download/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Install MetaMask
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      
      {showDisconnectInfo && (
        <div className="text-xs text-amber-500 bg-amber-50 border border-amber-200 p-2 rounded max-w-xs text-center">
          Your wallet has been disconnected from this application. 
          Note that MetaMask may still show this site as connected in its interface.
        </div>
      )}
      
      {!isConnected ? (
        <button
          onClick={connectWallet}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <span>Connect MetaMask</span>
        </button>
      ) : (
        <div className="flex flex-col gap-2 items-center">
          <div className="text-sm flex items-center">
            <span className="inline-block h-2 w-2 rounded-full bg-green-500 mr-2"></span>
            <span>
              {account?.slice(0, 6)}...{account?.slice(-4)}
            </span>
          </div>
          
          <div className="text-xs text-gray-500">
            {getNetworkName(chainId)}
          </div>
          
          <button
            onClick={handleDisconnect}
            disabled={isDisconnecting}
            className={`text-xs ${isDisconnecting ? 'text-gray-400' : 'text-red-500 hover:text-red-700'}`}
          >
            {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
          </button>
        </div>
      )}
    </div>
  );
};