'use client';

import React, { useState, useEffect } from 'react';
import { useMetaMask } from '../hooks/useMetaMask';
import { SignatureActionPayload } from '../types/api';
import { ethers } from 'ethers';

interface SignatureRequestProps {
  payload: SignatureActionPayload;
  onComplete?: (success: boolean, signature?: string) => void;
}

// Signature statuses
type SignatureStatus = 
  | 'idle' 
  | 'pending' 
  | 'success' 
  | 'error' 
  | 'rejected';

// Enhanced type for different signature types
type SignatureType = 'personal' | 'typed-data' | 'eip712';

export const SignatureRequest: React.FC<SignatureRequestProps> = ({ 
  payload, 
  onComplete 
}) => {
  const { account, connectWallet } = useMetaMask();
  const [status, setStatus] = useState<SignatureStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  
  // Determine signature type based on message content
  const determineSignatureType = (): SignatureType => {
    // Check if it's a typed data signature (EIP-712)
    try {
      // If it can be parsed as JSON and has domain & types fields, it's likely EIP-712
      if (typeof payload.message === 'string') {
        const parsed = JSON.parse(payload.message);
        if (parsed.domain && parsed.types) {
          return 'eip712';
        }
      }
    } catch (e) {
      // Not JSON, continue checking
    }
    
    // For now, default to personal signature
    return 'personal';
  };
  
  const signatureType = determineSignatureType();

  // Format the message for display
  const formatMessage = () => {
    if (signatureType === 'eip712') {
      try {
        // Pretty print the JSON for EIP-712
        return JSON.stringify(JSON.parse(payload.message), null, 2);
      } catch (e) {
        return payload.message;
      }
    } else {
      return payload.message;
    }
  };

  const handleSignMessage = async () => {
    if (!window.ethereum || status === 'pending') return;
    
    setStatus('pending');
    setError(null);
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      let sig: string;
      
      // Handle different signature types
      if (signatureType === 'eip712') {
        try {
          // For EIP-712, we need to use eth_signTypedData_v4
          const typedData = JSON.parse(payload.message);
          // Call signTypedData directly on ethereum provider
          sig = await window.ethereum.request({
            method: 'eth_signTypedData_v4',
            params: [account, JSON.stringify(typedData)],
          });
        } catch (e) {
          // Fall back to regular sign if EIP-712 fails
          console.warn('EIP-712 signature failed, falling back to personal sign', e);
          sig = await signer.signMessage(payload.message);
        }
      } else {
        // Regular personal sign
        sig = await signer.signMessage(payload.message);
      }
      
      setSignature(sig);
      setStatus('success');
      
      // Call onComplete with success
      if (onComplete) {
        onComplete(true, sig);
      }
    } catch (error: any) {
      console.error('Signature error:', error);
      
      // Detect rejection vs other errors
      if (error.code === 4001 || error.message?.includes('user rejected')) {
        setStatus('rejected');
        setError('Signature was rejected by the user.');
      } else {
        setStatus('error');
        setError(error.message || 'Failed to sign message');
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
          Please connect your wallet to sign this message.
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

  // If signature was completed successfully
  if (status === 'success' && signature) {
    return (
      <div className="border border-green-200 bg-green-50 p-4 rounded-md">
        <h4 className="font-semibold text-green-800 mb-2">Signature Successful</h4>
        <p className="text-sm text-green-700 mb-2">Message has been signed successfully!</p>
        <div className="bg-white border border-green-200 p-2 rounded-md mb-2">
          <div className="text-xs text-green-600 mb-1 font-medium">Signature:</div>
          <div className="text-xs text-green-800 font-mono break-all">
            {signature}
          </div>
        </div>
        <div className="text-xs text-green-600">
          This signature can be verified on-chain or by using ethers.js verifyMessage().
        </div>
      </div>
    );
  }

  return (
    <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
      <h4 className="font-semibold text-blue-800 mb-2">
        {signatureType === 'eip712' ? 'EIP-712 Signature Required' : 'Signature Required'}
      </h4>
      
      {error && (
        <div className="bg-red-100 border border-red-200 text-red-700 p-2 rounded mb-3 text-sm">
          {error}
        </div>
      )}
      
      <div className="mb-4">
        <div className="text-sm text-blue-700 font-medium mb-1">Message to sign:</div>
        <div className="bg-white border border-blue-200 p-2 rounded-md text-sm text-blue-800 whitespace-pre-wrap font-mono overflow-auto max-h-48">
          {formatMessage()}
        </div>
      </div>

      {signatureType === 'eip712' && (
        <div className="mb-4 bg-blue-100 p-2 rounded text-xs text-blue-700">
          <p className="font-medium mb-1">This is a structured data signature (EIP-712)</p>
          <p>This type of signature provides better security and readability compared to plain text signatures.</p>
        </div>
      )}
      
      <div className="flex justify-end space-x-3">
        <button
          onClick={handleReject}
          disabled={status === 'pending'}
          className="border border-blue-300 text-blue-700 hover:bg-blue-100 font-medium py-1.5 px-3 rounded text-sm transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        
        <button
          onClick={handleSignMessage}
          disabled={status === 'pending'}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-3 rounded text-sm transition-colors disabled:opacity-50 flex items-center"
        >
          {status === 'pending' ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing...
            </>
          ) : (
            'Sign Message'
          )}
        </button>
      </div>
    </div>
  );
};