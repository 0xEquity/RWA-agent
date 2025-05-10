import { create } from 'zustand';

interface XWalletState {
  email: string | null;
  isLoading: boolean;
  error: string | null;
  setEmail: (email: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useXWallet = create<XWalletState>((set) => ({
  email: null,
  isLoading: false,
  error: null,
  setEmail: (email) => set({ email }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));