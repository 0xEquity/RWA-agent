'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface XWalletState {
  isConnected: boolean;
  walletAddress: string | null;
  jwt: string | null;
  email: string | null;
}

interface XWalletContextType extends XWalletState {
  connect: (email: string) => Promise<void>;
  disconnect: () => void;
}

const XWalletContext = createContext<XWalletContextType | undefined>(undefined);

interface XWalletProviderProps {
  children: ReactNode;
}

function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
  return btoa(binary);
}

export function XWalletContextProvider({ children }: XWalletProviderProps) {
  const [walletState, setWalletState] = useState<XWalletState>({
    isConnected: false,
    walletAddress: null,
    jwt: null,
    email: null
  });

  // Load saved wallet state on mount
  useEffect(() => {
    const savedData = localStorage.getItem('xwallet_data');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        setWalletState({
          isConnected: true,
          walletAddress: data.wallet_address,
          jwt: data.jwt,
          email: data.email
        });
      } catch (error) {
        console.error('Failed to load saved wallet data:', error);
        localStorage.removeItem('xwallet_data');
      }
    }
  }, []);

  const connect = async (email: string) => {
    try {
      // Step 1: Initialize connection with email
      const initResponse = await fetch('https://directus.0xequity.com/flows/trigger/bcca7668-bcc2-43e0-b2a3-e2d9630579d5', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'https://app.0xequity.com',
          'Referer': 'https://app.0xequity.com'
        },
        body: JSON.stringify({
          email,
          chain_id: 8453,
          user_id: '',
          device_id: Date.now()
        })
      });

      if (!initResponse.ok) {
        throw new Error('Failed to initialize wallet connection');
      }

      const initData = await initResponse.json();
      
      if (!initData.credential?.challenge) {
        throw new Error('No challenge received from server');
      }

      // Step 2: Create passkey credential
      const challenge = Uint8Array.from(atob(initData.credential.challenge), c => c.charCodeAt(0));
      
      const publicKeyCredential = await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: {
            name: "xWallet",
            id: window.location.hostname
          },
          user: {
            id: Uint8Array.from(initData.credential.user.id.split('').map((c: string) => c.charCodeAt(0))),
            name: initData.credential.user.name,
            displayName: initData.credential.user.displayName
          },
          pubKeyCredParams: [
            { type: "public-key", alg: -7 } // ES256
          ],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            requireResidentKey: false,
            userVerification: "preferred"
          },
          timeout: 60000,
          attestation: "direct"
        }
      }) as PublicKeyCredential;

      if (!publicKeyCredential) {
        throw new Error('Failed to create passkey');
      }

      // Step 3: Send the credential response back to the server
      const rawId = bufferToBase64(publicKeyCredential.rawId);
      const attestationResponse = publicKeyCredential.response as AuthenticatorAttestationResponse;
      const clientDataJSON = bufferToBase64(attestationResponse.clientDataJSON);
      const attestationObject = bufferToBase64(attestationResponse.attestationObject);

      const verifyResponse = await fetch('https://directus.0xequity.com/flows/trigger/bcca7668-bcc2-43e0-b2a3-e2d9630579d5/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Origin': 'https://app.0xequity.com',
          'Referer': 'https://app.0xequity.com'
        },
        body: JSON.stringify({
          id: rawId,
          email,
          clientDataJSON,
          attestationObject
        })
      });

      if (!verifyResponse.ok) {
        throw new Error('Failed to verify passkey');
      }

      const verifyData = await verifyResponse.json();

      // Step 4: Update wallet state with the verified data
      const newState: XWalletState = {
        isConnected: true,
        walletAddress: verifyData.wallet_address,
        jwt: verifyData.jwt,
        email
      };
      
      setWalletState(newState);
      localStorage.setItem('xwallet_data', JSON.stringify({
        wallet_address: verifyData.wallet_address,
        jwt: verifyData.jwt,
        email
      }));

    } catch (error) {
      console.error('Failed to connect wallet:', error);
      throw error;
    }
  };

  const disconnect = () => {
    const newState: XWalletState = {
      isConnected: false,
      walletAddress: null,
      jwt: null,
      email: null
    };
    setWalletState(newState);
    localStorage.removeItem('xwallet_data');
  };

  return (
    <XWalletContext.Provider value={{ ...walletState, connect, disconnect }}>
      {children}
    </XWalletContext.Provider>
  );
}

export function useXWalletContext() {
  const context = useContext(XWalletContext);
  if (context === undefined) {
    throw new Error('useXWalletContext must be used within a XWalletContextProvider');
  }
  return context;
}