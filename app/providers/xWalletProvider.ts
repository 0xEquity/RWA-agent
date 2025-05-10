import { Network } from "@coinbase/agentkit";

interface WalletTransaction {
  to: string;
  value?: string;
  data?: string;
}

export class XWalletProvider {
  private walletAddress: string | null = null;
  private jwt: string | null = null;
  private networkId: string;
  private onStateChange?: (state: { walletAddress: string | null; jwt: string | null }) => void;

  constructor(networkId: string) {
    this.networkId = networkId;
    
    // Try to load saved wallet data
    if (typeof window !== 'undefined') {
      try {
        const savedData = localStorage.getItem('xwallet_data');
        if (savedData) {
          const { wallet_address, jwt } = JSON.parse(savedData);
          this.walletAddress = wallet_address;
          this.jwt = jwt;
        }
      } catch (error) {
        console.error('Failed to load wallet data:', error);
      }
    }

    // Listen for storage events to sync state across tabs/windows
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', (event) => {
        if (event.key === 'xwallet_data') {
          if (event.newValue) {
            const { wallet_address, jwt } = JSON.parse(event.newValue);
            this.setWalletData(wallet_address, jwt);
          } else {
            this.clearWalletData();
          }
        }
      });
    }
  }

  getName(): string {
    return 'xWallet';
  }

  getNetwork(): Network {
    return {
      networkId: this.networkId,
      protocolFamily: 'evm'
    };
  }

  getAddress(): string {
    if (!this.walletAddress) {
      throw new Error('Wallet not connected');
    }
    return this.walletAddress;
  }

  async getBalance(): Promise<bigint> {
    if (!this.jwt || !this.walletAddress) {
      throw new Error('Wallet not connected');
    }

    // TODO: Implement balance checking
    // This would involve making a request to your backend with the JWT
    // to fetch the wallet balance
    return 0n;
  }

  async signMessage(message: string): Promise<string> {
    if (!this.jwt || !this.walletAddress) {
      throw new Error('Wallet not connected');
    }

    // TODO: Implement passkey signing for messages
    console.log('Message to sign:', message);
    throw new Error('Message signing not yet implemented');
  }

  async sendTransaction(transaction: WalletTransaction): Promise<string> {
    if (!this.jwt || !this.walletAddress) {
      throw new Error('Wallet not connected');
    }

    // TODO: Implement transaction sending
    console.log('Transaction to send:', transaction);
    throw new Error('Transaction sending not yet implemented');
  }

  async nativeTransfer(to: string, value: string): Promise<string> {
    return this.sendTransaction({
      to,
      value,
      data: '0x'
    });
  }

  setWalletData(address: string, jwt: string) {
    this.walletAddress = address;
    this.jwt = jwt;
    this.onStateChange?.({ walletAddress: address, jwt });
  }

  clearWalletData() {
    this.walletAddress = null;
    this.jwt = null;
    this.onStateChange?.({ walletAddress: null, jwt: null });
  }

  subscribeToStateChanges(callback: (state: { walletAddress: string | null; jwt: string | null }) => void) {
    this.onStateChange = callback;
  }

  unsubscribeFromStateChanges() {
    this.onStateChange = undefined;
  }
}