import { useState } from 'react';
import { useXWallet } from '../hooks/useXWallet';
import { useXWalletContext } from '../providers/XWalletContext';

export const XWallet = () => {
  const [emailInput, setEmailInput] = useState('');
  const { isLoading, error, setLoading, setError } = useXWallet();
  const walletContext = useXWalletContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Simple email validation
      if (!emailInput.includes('@')) {
        throw new Error('Please enter a valid email address');
      }

      // Connect wallet using XWalletContext
      await walletContext.connect(emailInput);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process email');
    } finally {
      setLoading(false);
    }
  };

  if (walletContext.isConnected) {
    return (
      <div className="flex flex-col items-center gap-4 p-4">
        <p className="text-green-500">Wallet connected</p>
        <p className="text-sm font-mono break-all">Email: {walletContext.email}</p>
        <p className="text-sm font-mono break-all">Address: {walletContext.walletAddress}</p>
        <button
          onClick={() => {
            walletContext.disconnect();
            setEmailInput('');
          }}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-sm">
        <input
          type="email"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          placeholder="Enter your email"
          required
          disabled={isLoading}
          className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 text-black"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={"font-bold py-2 px-4 rounded flex items-center bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"}
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8z"
              />
            </svg>
          ) : null}
          <span>{isLoading ? "Processing..." : "Continue with xWallet"}</span>
        </button>
      </form>
    </div>
  );
};
