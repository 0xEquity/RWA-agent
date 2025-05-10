'use client';

import React, { createContext, ReactNode } from "react";
import { WebAuthnWrapper } from "../passkey/WebAuthnWrapper";
import { MetaMaskProvider } from "./MetaMaskContext";
import { XWalletContextProvider } from "./XWalletContext";

const waw = new WebAuthnWrapper();

export const AppContext = createContext<WebAuthnWrapper>(waw);

// Combined providers wrapper
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppContext.Provider value={waw}>
      <MetaMaskProvider>
        <XWalletContextProvider>
          {children}
        </XWalletContextProvider>
      </MetaMaskProvider>
    </AppContext.Provider>
  );
}
