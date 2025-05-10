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
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Continue with xWallet'}
        </button>
      </form>
    </div>
  );
};