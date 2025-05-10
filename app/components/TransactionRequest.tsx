'use client';

import React, { useState, useEffect } from 'react';
import { useMetaMask } from '../hooks/useMetaMask';
import { TransactionActionPayload } from '../types/api';
import { ethers } from 'ethers';

interface TransactionRequestProps {
  payload: TransactionActionPayload;
  onComplete?: (success: boolean, txHash?: string) => void;
}

// Transaction statuses
type TransactionStatus = 
  | 'idle' 
  | 'pending' 
  | 'mining' 
  | 'success' 
  | 'error' 
  | 'rejected';

export const TransactionRequest: React.FC<TransactionRequestProps> = ({ 
  payload, 
  onComplete 
}) => {
  const { account, connectWallet } = useMetaMask();
  const [status, setStatus] = useState<TransactionStatus>('idle');
  const [txError, setTxError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [confirmations, setConfirmations] = useState<number>(0);
  const [estimatedGas, setEstimatedGas] = useState<string | null>(null);
  const [gasPrice, setGasPrice] = useState<string | null>(null);

  // Format ETH value for display
  const formatValue = (value: string | number | undefined) => {
    if (!value) return '0 ETH';
    try {
      const valueInWei = typeof value === 'string' 
        ? value 
        : value.toString();
      const valueInEth = ethers.formatEther(valueInWei);
      return `${parseFloat(valueInEth).toFixed(6)} ETH`;
    } catch (e) {
      return `${value} (unknown format)`;
    }
  };

  // Format transaction data or show "No data" if empty
  const formatData = (data: string | undefined) => {
    if (!data || data === '0x') return 'No data';
    return data.length > 24
      ? `${data.slice(0, 10)}...${data.slice(-8)}`
      : data;
  };

  // Estimate gas and gas price on component mount
  useEffect(() => {
    const estimateGasAndPrice = async () => {
      if (!window.ethereum || !account) return;
      
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        
        // Prepare transaction to estimate
        const tx = {
          to: payload.to,
          from: payload.from || account,
          value: payload.value ? payload.value.toString() : '0',
          data: payload.data || '0x',
        };
        
        // Get gas estimate and current gas price
        const [gasEstimate, feeData] = await Promise.all([
          provider.estimateGas(tx),
          provider.getFeeData()
        ]);
        
        setEstimatedGas(gasEstimate.toString());
        setGasPrice(feeData.gasPrice ? ethers.formatUnits(feeData.gasPrice, 'gwei') : null);
      } catch (error) {
        console.error('Gas estimation error:', error);
        // Don't show error to user, just continue without the estimates
      }
    };
    
    if (account) {
      estimateGasAndPrice();
    }
  }, [payload, account]);

  const handleApproveTransaction = async () => {
    if (!window.ethereum || status === 'pending' || status === 'mining') return;
    
    setStatus('pending');
    setTxError(null);
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Prepare transaction
      const tx = {
        to: payload.to,
        from: payload.from || account,
        value: payload.value ? payload.value.toString() : '0',
        data: payload.data || '0x',
        gasLimit: payload.gasLimit || estimatedGas,
        // Use provided gas price parameters or fall back to automatic
        gasPrice: payload.gasPrice,
        maxFeePerGas: payload.maxFeePerGas,
        maxPriorityFeePerGas: payload.maxPriorityFeePerGas,
        nonce: payload.nonce
      };
      
      // Send transaction to MetaMask for user confirmation
      const signer = await provider.getSigner();
      const response = await signer.sendTransaction(tx);
      
      // Save transaction hash and update status
      setTxHash(response.hash);
      setStatus('mining');
      
      // Track confirmations and wait for transaction
      const receipt = await provider.waitForTransaction(response.hash);
      setConfirmations(receipt.confirmations);
      
      // Update status based on receipt
      if (receipt.status === 0) {
        throw new Error('Transaction failed on-chain');
      }
      
      setStatus('success');
      
      // Call onComplete with success
      if (onComplete) {
        onComplete(true, response.hash);
      }
    } catch (error: any) {
      console.error('Transaction error:', error);
      
      // Detect rejection vs other errors
      if (error.code === 4001 || error.message?.includes('user rejected')) {
        setStatus('rejected');
        setTxError('Transaction was rejected by the user.');
      } else {
        setStatus('error');
        setTxError(error.message || 'Transaction failed');
      }
      
      if (onComplete) {
        onComplete(false);
      }
    }
  };

  const handleReject = () => {
    setStatus('rejected');
    if (onComplete) {
      onComplete(false);
    }
  };

  // If wallet not connected, prompt the user to connect
  if (!account) {
    return (
      <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
        <h4 className="font-semibold text-blue-800 mb-2">Wallet Connection Required</h4>
        <p className="text-sm text-blue-700 mb-3">
          Please connect your wallet to proceed with this transaction.
        </p>
        <button
          onClick={connectWallet}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-3 rounded text-sm transition-colors"
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  // If transaction was completed successfully
  if (status === 'success') {
    return (
      <div className="border border-green-200 bg-green-50 p-4 rounded-md">
        <h4 className="font-semibold text-green-800 mb-2">Transaction Successful</h4>
        <p className="text-sm text-green-700 mb-1">
          Transaction has been confirmed with {confirmations} confirmation(s)!
        </p>
        <p className="text-xs text-green-600 font-mono break-all mb-3">
          TX Hash: {txHash}
        </p>
        <a 
          href={`https://basescan.org/tx/${txHash}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-green-600 hover:text-green-800 underline"
        >
          View on Block Explorer
        </a>
      </div>
    );
  }

  // If transaction is being mined
  if (status === 'mining' && txHash) {
    return (
      <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
        <h4 className="font-semibold text-blue-800 mb-2">Transaction Processing</h4>
        <div className="flex items-center mb-2">
          <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-blue-700">Waiting for confirmation...</span>
        </div>
        <p className="text-xs text-blue-600 font-mono break-all mb-3">
          TX Hash: {txHash}
        </p>
        <a 
          href={`https://basescan.org/tx/${txHash}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:text-blue-800 underline"
        >
          View on Block Explorer
        </a>
      </div>
    );
  }

  return (
    <div className="border border-amber-200 bg-amber-50 p-4 rounded-md">
      <h4 className="font-semibold text-amber-800 mb-2">Transaction Approval Required</h4>
      
      {txError && (
        <div className="bg-red-100 border border-red-200 text-red-700 p-2 rounded mb-3 text-sm">
          {txError}
        </div>
      )}
      
      <div className="space-y-2 mb-4">
        <div className="grid grid-cols-3 text-sm">
          <span className="text-amber-700 font-medium">To:</span>
          <span className="col-span-2 text-amber-900 font-mono break-all">{payload.to}</span>
        </div>
        
        <div className="grid grid-cols-3 text-sm">
          <span className="text-amber-700 font-medium">From:</span>
          <span className="col-span-2 text-amber-900 font-mono break-all">{payload.from || account}</span>
        </div>
        
        <div className="grid grid-cols-3 text-sm">
          <span className="text-amber-700 font-medium">Value:</span>
          <span className="col-span-2 text-amber-900 font-mono">{formatValue(payload.value)}</span>
        </div>
        
        {estimatedGas && (
          <div className="grid grid-cols-3 text-sm">
            <span className="text-amber-700 font-medium">Est. Gas:</span>
            <span className="col-span-2 text-amber-900 font-mono">{parseInt(estimatedGas).toLocaleString()} units</span>
          </div>
        )}
        
        {gasPrice && (
          <div className="grid grid-cols-3 text-sm">
            <span className="text-amber-700 font-medium">Gas Price:</span>
            <span className="col-span-2 text-amber-900 font-mono">{gasPrice} Gwei</span>
          </div>
        )}
        
        <div className="grid grid-cols-3 text-sm">
          <span className="text-amber-700 font-medium">Data:</span>
          <span className="col-span-2 text-amber-900 font-mono break-all">
            {formatData(payload.data)}
          </span>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          onClick={handleReject}
          disabled={status === 'pending' || status === 'mining'}
          className="border border-amber-300 text-amber-700 hover:bg-amber-100 font-medium py-1.5 px-3 rounded text-sm transition-colors disabled:opacity-50"
        >
          Reject
        </button>
        
        <button
          onClick={handleApproveTransaction}
          disabled={status === 'pending' || status === 'mining'}
          className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-1.5 px-3 rounded text-sm transition-colors disabled:opacity-50 flex items-center"
        >
          {status === 'pending' ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Waiting for wallet...
            </>
          ) : (
            'Approve & Send'
          )}
        </button>
      </div>
    </div>
  );
};