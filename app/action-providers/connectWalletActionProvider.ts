import { ActionProvider, CreateAction, WalletProvider } from "@coinbase/agentkit";
import { z } from "zod";
import { cookies } from "next/headers";

// Define schemas
const GetWalletDetailsSchema = z.object({}).strict();
const NativeTransferSchema = z.object({
  to: z.string().describe("Destination wallet address"),
  value: z.string().describe("Amount to transfer"),
});
const CheckWalletConnectionSchema = z.object({}).strict();
const GetWalletSessionSchema = z.object({}).strict();

// Wallet terminology based on protocol family
const PROTOCOL_FAMILY_TO_TERMINOLOGY: Record<
  string,
  { unit: string; displayUnit: string; type: string; verb: string }
> = {
  evm: { unit: "WEI", displayUnit: "ETH", type: "Transaction hash", verb: "transaction" },
  svm: { unit: "LAMPORTS", displayUnit: "SOL", type: "Signature", verb: "transfer" },
};

const DEFAULT_TERMINOLOGY = { unit: "WEI", displayUnit: "ETH", type: "Hash", verb: "transfer" };

export class ConnectWalletActionProvider extends ActionProvider {
  constructor() {
    super("connect_wallet", []);
  }

  supportsNetwork(): boolean {
    return true; // This action is network-independent
  }

  @CreateAction({
    name: "connect_metamask",
    description: `Connect to MetaMask wallet to interact with the blockchain.
    Thought: When a user needs to connect their wallet, I should:
    1. First check if MetaMask is installed
    2. Request wallet connection
    3. Return appropriate UI component
    Action: Return ConnectWallet component to handle the connection flow
    Observation: User will be prompted to connect their MetaMask wallet`,
    schema: z.null(),
  })
  async connectWallet(): Promise<{
    type: "component";
    component: string;
    props: Record<string, unknown>;
  }> {
    return {
      type: "component",
      component: "ConnectWallet",
      props: {},
    };
  }

  @CreateAction({
    name: "check_wallet_connection",
    description: `
    Check if a wallet is currently connected to the application.
    This will return information about the connection status by checking
    the server-side session data.

    Use this to quickly determine if the user has a wallet connected before 
    attempting operations that require a connected wallet. This should be your default wallet address.
    

    `,
    schema: CheckWalletConnectionSchema,
  })
  async checkWalletConnection(
    walletProvider: WalletProvider,
    _: z.infer<typeof CheckWalletConnectionSchema>
  ): Promise<string> {
    try {
      // First try to access the wallet directly through the provider
      let directCheck = false;
      let walletAddress = "";
      try {
        walletAddress = walletProvider.getAddress();
        directCheck = true;
      } catch (e) {
        // Direct check failed, we'll check session cookies later
      }

      // If direct check succeeded, return that info
      if (directCheck) {
        return `A wallet is currently connected and active. Address: ${walletAddress}`;
      }

      // Otherwise check session data from cookies
      const sessionData = await this.getSessionWalletData();
      
      if (sessionData.isConnected && sessionData.walletAddress) {
        return `Wallet is connected via ${sessionData.providerName || sessionData.walletType || "unknown provider"}. Address: ${sessionData.walletAddress}.`;
      } else {
        return "No wallet is currently connected. Please connect a wallet first using the connect_metamask or connect_xwallet action.";
      }
    } catch (error) {
      return `Error checking wallet connection: ${error}`;
    }
  }

  @CreateAction({
    name: "get_wallet_session",
    description: `
    Retrieve information about the current wallet session from server-side cookies.
    This provides details about the wallet that is currently connected via session cookies,
    which may include:
    - Wallet address
    - Type of wallet (MetaMask, xWallet)
    - Connection status
    - Chain ID

    Use this to get session-based wallet information without requiring direct wallet access.

    Important: Now this now your default wallet , address, web3 address
    `,
    schema: GetWalletSessionSchema,
  })
  async getWalletSession(
    _: WalletProvider,
    __: z.infer<typeof GetWalletSessionSchema>
  ): Promise<string> {
    try {
      const sessionData = await this.getSessionWalletData();
        console.log({sessionData})
      if (sessionData.isConnected && sessionData.walletAddress) {
        return [
          "Wallet Session Details:",
          `- Connected: Yes`,
          `- Provider: ${sessionData.providerName || sessionData.walletType || "unknown"}`,
          `- Address: ${sessionData.walletAddress}`,
          `- Chain ID: ${sessionData.chainId || 'unknown'}`,
        ].join("\n");
      } else {
        return "No wallet session is currently active in server-side cookies. Please connect a wallet first.";
      }
    } catch (error) {
      return `Error retrieving wallet session: ${error}`;
    }
  }

  @CreateAction({
    name: "get_wallet_details",
    description: `
    This tool will return the details of the connected wallet including:
    - Wallet address
    - Network information (protocol family, network ID, chain ID)
    - Native token balance (ETH for EVM networks, SOL for Solana networks)
    - Wallet provider name
    
    Use this to check if a wallet is currently connected and get its details.
    The agent will attempt to get live wallet data first, and fall back to session data if necessary.
    Important: Now this now your default wallet , address, web3 address
    `,
    schema: GetWalletDetailsSchema,
  })
  async getWalletDetails(
    walletProvider: WalletProvider,
    _: z.infer<typeof GetWalletDetailsSchema>
  ): Promise<string> {
    try {
      // First try to get details directly from the wallet provider
      const sessionData = await this.getSessionWalletData();
      
      if (sessionData.isConnected && sessionData.walletAddress) {
        return [
          "Wallet Session Details:",
          `- Connected: Yes`,
          `- Provider: ${sessionData.providerName || sessionData.walletType || "unknown"}`,
          `- Address: ${sessionData.walletAddress}`,
          `- Chain ID: ${sessionData.chainId || 'unknown'}`,
        ].join("\n");
      } else {
        return "No wallet session is currently active in server-side cookies. Please connect a wallet first.";
      }
    } catch (error) {
      return `Error getting wallet details: ${error}`;
    }
  }

  // Helper method to get wallet session data from server-side cookies
  private async getSessionWalletData(): Promise<{ 
    isConnected: boolean;
    walletAddress?: string;
    walletType?: string;
    chainId?: string;
    providerName?: string;
  }> {
    try {
      // Access cookies using Next.js headers API
      const cookieStore = cookies();
      console.log(cookieStore,"0-0-0-0-0-1")
      const walletSession = cookieStore.get('wallet_session')?.value
      console.log({walletSession})
      const  p = JSON.parse(walletSession as any)
      // Check for wallet-related cookies
      const walletAddress = p.walletAddress;
      const walletType = cookieStore.get('wallet_type')?.value;
      const chainId = p.chainId;

      console.log({walletAddress},"0-0-0-0-0-0-0-0")
      
      if (walletAddress) {
        return {
          isConnected: true,
          walletAddress,
          walletType,
          chainId,
        };
      }
    } catch (error) {
      console.error('Error accessing wallet session cookies:', error);
    }
    
    // Default to no connection if cookies aren't found or there's an error
    return { isConnected: false };
  }

  @CreateAction({
    name: "native_transfer",
    description: `
This tool will transfer native tokens from the wallet to another onchain address.

It takes the following inputs:
- value: The amount to transfer in whole units (e.g. 1 ETH, 0.1 SOL)
- to: The address to receive the funds

Important notes:
- Ensure sufficient balance of the input asset before transferring
- Ensure there is sufficient native token balance for gas fees
- For EVM networks, a transaction signature will be requested in MetaMask
`,
    schema: NativeTransferSchema,
  })
  async nativeTransfer(
    walletProvider: WalletProvider,
    args: z.infer<typeof NativeTransferSchema>,
  ): Promise<string> {
    try {
      // Get network info to determine terminology
      const { protocolFamily } = walletProvider.getNetwork();
      const terminology = PROTOCOL_FAMILY_TO_TERMINOLOGY[protocolFamily] || DEFAULT_TERMINOLOGY;

      // For EVM addresses, ensure they start with 0x
      if (protocolFamily === "evm" && !args.to.startsWith("0x")) {
        args.to = `0x${args.to}`;
      }

      // Perform the transfer using the wallet provider
      const result = await walletProvider.nativeTransfer(args.to, args.value);
      
      return [
        `Transferred ${args.value} ${terminology.displayUnit} to ${args.to}`,
        `${terminology.type}: ${result}`,
      ].join("\n");
    } catch (error) {
      const { protocolFamily } = walletProvider.getNetwork();
      const terminology = PROTOCOL_FAMILY_TO_TERMINOLOGY[protocolFamily] || DEFAULT_TERMINOLOGY;
      return `Error during ${terminology.verb}: ${error}`;
    }
  }
}
