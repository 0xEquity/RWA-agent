import { useMetaMask } from '../hooks/useMetaMask';

export const ConnectWallet = () => {
  const { account, error, connectWallet } = useMetaMask();

  return (
    <div className="flex flex-col items-center gap-2">
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      {!account ? (
        <button
          onClick={connectWallet}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Connect MetaMask
        </button>
      ) : (
        <div className="text-sm">
          Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </div>
      )}
    </div>
  );
};