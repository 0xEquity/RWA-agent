import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// MetaMask connection state
export const metamaskAddressAtom = atomWithStorage<string | null>(
  "0xequity/v2/metamask/address",
  null
);

export const metamaskChainIdAtom = atomWithStorage<number | null>(
  "0xequity/v2/metamask/chainId",
  null
);

export const metamaskIsConnectedAtom = atomWithStorage<boolean>(
  "0xequity/v2/metamask/isConnected",
  false
);

export const metamaskErrorAtom = atom<string | null>(null);

// Derived atom that combines all MetaMask state
export const metamaskStateAtom = atom((get) => {
  return {
    address: get(metamaskAddressAtom),
    chainId: get(metamaskChainIdAtom),
    isConnected: get(metamaskIsConnectedAtom),
    error: get(metamaskErrorAtom),
  };
});

// Setter atoms
const setMetamaskAddressAtom = atom<null, [string | null], void>(
  null,
  (_, set, address) => set(metamaskAddressAtom, address)
);

const setMetamaskChainIdAtom = atom<null, [number | null], void>(
  null,
  (_, set, chainId) => set(metamaskChainIdAtom, chainId)
);

const setMetamaskIsConnectedAtom = atom<null, [boolean], void>(
  null,
  (_, set, isConnected) => set(metamaskIsConnectedAtom, isConnected)
);

const setMetamaskErrorAtom = atom<null, [string | null], void>(
  null,
  (_, set, error) => set(metamaskErrorAtom, error)
);

// Composite setter for disconnection
const disconnectMetamaskAtom = atom<null, [], void>(null, (_, set) => {
  set(metamaskAddressAtom, null);
  set(metamaskChainIdAtom, null);
  set(metamaskIsConnectedAtom, false);
  set(metamaskErrorAtom, null);
});

// Hook to easily access and update MetaMask state
export const useMetamaskJotai = () => {
  const [address, setAddress] = useAtom(metamaskAddressAtom);
  const [chainId, setChainId] = useAtom(metamaskChainIdAtom);
  const [isConnected, setIsConnected] = useAtom(metamaskIsConnectedAtom);
  const [error, setError] = useAtom(metamaskErrorAtom);
  const [, disconnect] = useAtom(disconnectMetamaskAtom);
  
  // Composite function to update all state at once
  const updateMetamaskState = (state: {
    address?: string | null;
    chainId?: number | null;
    isConnected?: boolean;
    error?: string | null;
  }) => {
    if (state.address !== undefined) setAddress(state.address);
    if (state.chainId !== undefined) setChainId(state.chainId);
    if (state.isConnected !== undefined) setIsConnected(state.isConnected);
    if (state.error !== undefined) setError(state.error);
  };

  return {
    address,
    chainId,
    isConnected,
    error,
    setAddress,
    setChainId,
    setIsConnected,
    setError,
    disconnect,
    updateMetamaskState,
  };
};