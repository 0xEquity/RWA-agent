'use client';

import React, { useState } from 'react';
import { useMetaMask } from '../hooks/useMetaMask';
import { TransactionActionPayload } from '../types/api';
import { ethers } from 'ethers';

interface TransactionRequestProps {
  payload: TransactionActionPayload;
  onComplete?: (success: boolean, txHash?: string) => void;
}

export const TransactionRequest: React.FC<TransactionRequestProps> = ({ 
  payload, 
  onComplete 
}) => {
  const { address } = useMetaMask();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [txError, setTxError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

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

  const handleApproveTransaction = async () => {
    if (!window.ethereum || isSubmitting) return;
    
    setIsSubmitting(true);
    setTxError(null);
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Prepare transaction
      const tx = {
        to: payload.to,
        from: payload.from || address,
        value: payload.value ? payload.value.toString() : '0',
        data: payload.data || '0x',
        gasLimit: payload.gasLimit,
        gasPrice: payload.gasPrice,
        maxFeePerGas: payload.maxFeePerGas,
        maxPriorityFeePerGas: payload.maxPriorityFeePerGas,
        nonce: payload.nonce
      };
      
      // Send transaction to MetaMask for user confirmation
      const signer = await provider.getSigner();
      const response = await signer.sendTransaction(tx);
      
      // Save transaction hash and wait for confirmation
      setTxHash(response.hash);
      
      // Wait for 1 confirmation
      await response.wait(1);
      
      // Call onComplete with success
      if (onComplete) {
        onComplete(true, response.hash);
      }
    } catch (error: any) {
      console.error('Transaction error:', error);
      setTxError(error.message || 'Transaction failed');
      if (onComplete) {
        onComplete(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = () => {
    if (onComplete) {
      onComplete(false);
    }
  };

  // If transaction was already completed
  if (txHash && !isSubmitting && !txError) {
    return (
      <div className="border border-green-200 bg-green-50 p-4 rounded-md">
        <h4 className="font-semibold text-green-800 mb-2">Transaction Successful</h4>
        <p className="text-sm text-green-700 mb-1">Transaction has been confirmed!</p>
        <p className="text-xs text-green-600 font-mono break-all">
          TX Hash: {txHash}
        </p>
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
      
      <div className="space-y-2 mb-3">
        <div className="grid grid-cols-3 text-sm">
          <span className="text-amber-700 font-medium">To:</span>
          <span className="col-span-2 text-amber-900 font-mono break-all">{payload.to}</span>
        </div>
        
        <div className="grid grid-cols-3 text-sm">
          <span className="text-amber-700 font-medium">Value:</span>
          <span className="col-span-2 text-amber-900 font-mono">{formatValue(payload.value)}</span>
        </div>
        
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
          disabled={isSubmitting}
          className="border border-amber-300 text-amber-700 hover:bg-amber-100 font-medium py-1.5 px-3 rounded text-sm transition-colors disabled:opacity-50"
        >
          Reject
        </button>
        
        <button
          onClick={handleApproveTransaction}
          disabled={isSubmitting}
          className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-1.5 px-3 rounded text-sm transition-colors disabled:opacity-50 flex items-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Approve & Send'
          )}
        </button>
      </div>
    </div>
  );
};