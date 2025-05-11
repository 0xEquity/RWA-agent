"use client";
import "@rainbow-me/rainbowkit/styles.css";

import React, { createContext, ReactNode } from "react";
import { WebAuthnWrapper } from "../passkey/WebAuthnWrapper";
import { XWalletContextProvider } from "./XWalletContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { base } from "viem/chains";
import { WagmiProvider } from "wagmi";
import { structuralSharing } from "wagmi/query";
import { RainbowKitProvider, getDefaultConfig } from "@rainbow-me/rainbowkit";
import { createStorage, cookieStorage } from "wagmi";

const waw = new WebAuthnWrapper();

export const AppContext = createContext<WebAuthnWrapper>(waw);

const projectId = "95e7c24988a2002694b01105c2bd4f25";

const config = getDefaultConfig({
  appName: "0xequity APP",
  projectId: projectId,
  chains: [base],
  storage: createStorage({
    storage: cookieStorage,
  }),
});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      structuralSharing,
    },
  },
});

// Combined providers wrapper
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppContext.Provider value={waw}>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <XWalletContextProvider>{children}</XWalletContextProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </AppContext.Provider>
  );
}
