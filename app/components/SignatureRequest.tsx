'use client';

import React, { useState } from 'react';
import { useMetaMask } from '../hooks/useMetaMask';
import { SignatureActionPayload } from '../types/api';
import { ethers } from 'ethers';

interface SignatureRequestProps {
  payload: SignatureActionPayload;
  onComplete?: (success: boolean, signature?: string) => void;
}

export const SignatureRequest: React.FC<SignatureRequestProps> = ({ 
  payload, 
  onComplete 
}) => {
  const { address } = useMetaMask();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const handleSignMessage = async () => {
    if (!window.ethereum || isSubmitting) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      // Sign the message
      const sig = await signer.signMessage(payload.message);
      setSignature(sig);
      
      // Call onComplete with success
      if (onComplete) {
        onComplete(true, sig);
      }
    } catch (error: any) {
      console.error('Signature error:', error);
      setError(error.message || 'Failed to sign message');
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

  // If signature was already completed
  if (signature && !isSubmitting && !error) {
    return (
      <div className="border border-green-200 bg-green-50 p-4 rounded-md">
        <h4 className="font-semibold text-green-800 mb-2">Signature Successful</h4>
        <p className="text-sm text-green-700 mb-1">Message has been signed!</p>
        <p className="text-xs text-green-600 font-mono break-all">
          Signature: {signature}
        </p>
      </div>
    );
  }

  return (
    <div className="border border-blue-200 bg-blue-50 p-4 rounded-md">
      <h4 className="font-semibold text-blue-800 mb-2">Signature Required</h4>
      
      {error && (
        <div className="bg-red-100 border border-red-200 text-red-700 p-2 rounded mb-3 text-sm">
          {error}
        </div>
      )}
      
      <div className="mb-3">
        <div className="text-sm text-blue-700 font-medium mb-1">Message to sign:</div>
        <div className="bg-white border border-blue-200 p-2 rounded-md text-sm text-blue-800 whitespace-pre-wrap">
          {payload.message}
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          onClick={handleReject}
          disabled={isSubmitting}
          className="border border-blue-300 text-blue-700 hover:bg-blue-100 font-medium py-1.5 px-3 rounded text-sm transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        
        <button
          onClick={handleSignMessage}
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1.5 px-3 rounded text-sm transition-colors disabled:opacity-50 flex items-center"
        >
          {isSubmitting ? (
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