'use client'
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { loginAtom } from '../atoms/login';
import { useAtom } from "jotai";
import { AppContext } from './AppContex';


import { toBase64url } from "@passwordless-id/webauthn/dist/esm/utils";
import { getBytes } from "ethers";
import { keccak256, toHex } from "viem";
import { useWalletJotai } from '../atoms/wallet.jotai';

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
  const [{ mutateAsync, status }] = useAtom(loginAtom);
  const waw = useContext(AppContext);
  const {
    setWalletType,
    setWalletWeb3Type,
    setWalletWeb3Address,
    setWalletDecodedKeys,
    setWalletCrendentialId,
    setWalletAddress,
    walletType,
    setIsConnected,
    setPassKeys,
  } = useWalletJotai();
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
      const result = await mutateAsync({
        email: email,
        user_id:  "",
        chain_id: 8453,
        device_id: 0,
      });
      if (result.wallet_type === "1") {
        const allkeys = result.all_credential.filter(
          (x: any) =>
            x.username !== "undefined" && x.wallet_address !== "undefined"
        );
        try {
          let passKey = await waw.parseRegisterPassKey(
            allkeys[0].credential,
            allkeys[0].credential.user?.name
              ? allkeys[0].credential?.user?.name
              : allkeys[0].username
          );
  
          let allPassKeysIds = allkeys.map((keys: any) => keys.credential.id )  as string[]
          const challenge = toBase64url(
            getBytes(keccak256(toHex("LoginMe2"))) as any
          ).replace(/=/g, "");
          const x = await passKey.webAuthnClient.authenticate(challenge,allPassKeysIds);
          const selectedKey = result.all_credential.filter(
            (f: any) => f.credential.id === x.id
          );
  
          console.log({selectedKey})
          if (selectedKey.length > 0) {
            setWalletDecodedKeys(selectedKey[0].credential.decoded_key);
            setWalletCrendentialId(selectedKey[0].credential.id);
            // passKey = await waw.parseRegisterPassKey((selectedKey[0].credential, selectedKey[0].credential.user?.name
            //   ? selectedKey[0].credential?.user?.name
            //   : selectedKey[0].username))
            setIsConnected(true);
          } else {
            // setServerError("Unknown / wrong passkey credentials");
            return;
          }
          const selectedPasskey =  await waw.parseRegisterPassKey(
            selectedKey[0].credential,
            selectedKey[0].credential.user?.name
              ? selectedKey[0].credential?.user?.name
              : selectedKey[0].username
          )
          setWalletWeb3Type(result.web3_wallet);
          // setUserId(result.id);
          setWalletWeb3Address(result.web3_address);
          setWalletType(parseInt(result.wallet_type));
          setWalletAddress(result.wallet_address);
          setWalletDecodedKeys(selectedKey[0].credential.decoded_key);
          setWalletCrendentialId(selectedKey[0].credential.id);
          setPassKeys([selectedPasskey]);
          const newState: XWalletState = {
            isConnected: true,
            walletAddress: result.wallet_address,
            jwt: null,
            email: email
          };
          setWalletState(newState);
        } catch (e) {
          console.log(e, "-------");
          //alert(JSON.stringify(e));
        }
      }

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