import { ActionProvider, CreateAction } from "@coinbase/agentkit";
import { z } from "zod";
import { createPublicClient, http, parseAbi, Address } from "viem";
import { base } from "viem/chains";

// Minimal ERC20 ABI for the functions we need
const CONTRACT_ABI = parseAbi([
  "function balanceOf(address account) view returns (uint256)",
  "function name() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
]);

const CONTRACT_ADDRESS = "0xce827d203dc317cb8823098dcbe88fd3ae447482";
const TOKEN_PRICE_USD = 10; // Fixed price as specified

export class ZeroXEquityActionProvider extends ActionProvider {
  constructor() {
    super(
      "0xequity is a RWA tokenization platform which allows investor to invest with as low as 10$ and earn 10% rental yield annually. its a way for users to earn some extra buck without investing huge capital",
      []
    );
  }

  supportsNetwork(): boolean {
    return true; // This action works on Base mainnet
  }

  @CreateAction({
    name: "yield_booster_strategy",
    description: `Enable and customize a yield automation strategy on the 0xequity protocol to maximize your rental income or DeFi returns. Choose from multiple strategies, specify how many property tokens to automate, and define USDC wallet thresholds for yield actions.
    Thought process:
    1. Use address from check_wallet_connection as default or always when check for invested properties.
    2. If address provided:
       - Present the available automation strategies and Ask the user to choose one strategy (1, 2, or 3) first dont show the inputs required until user select strategy:
       - Autocompound Only: Reinvest rent or yield into new property tokens automatically.
       - Autocompound + 2x Leverage: Use yield to buy property tokens and apply 2x leverage via 0xequity's money market.
       - Uniswap LP Deposit: Redirect yield into USDC/WETH LP to earn trading fees.
    3. Ask for Inputs from user to Number of Property Tokens , min and max USDC to use
      - How many property tokens do you want to automate for this strategy? (e.g., 5)
      - Enter the minimum USDC balance required in your wallet to trigger the automation.
      - Enter the maximum USDC limit you'd like to allow for automation in each cycle.

    Action: Return SignTX component to handle the automation flow
    Observation: User will be prompted to signTx from their wallet.
    
    Example valid responses:
    - Without address: "Please provide a wallet address to check property investments. Usage: 'Check investments for 0x...''"
    - With invalid address: "Please provide a valid Ethereum wallet address starting with '0x'"
    - With full inputs: ✅ Yield automation setup for wallet 0x... using 5 property tokens with min $50 and max $300 USDC. Strategy: Uniswap LP Deposit.
    
    Important: This action requires a valid Ethereum wallet address to proceed.`,
    schema: z.object({
      address: z
        .string()
        .optional()
        .describe("The wallet address to check property investments for"),
      strategy: z.string().describe("User strategy selection"),
      propertyTokens: z
        .string()
        .describe("Number of tokens to use for autmation"),
      minUSDC: z.string().describe("Minimum threshold for the usdc"),
      maxUSDC: z.string().describe("Max Threshold for usdc"),
    }),
  })
  async getAutomationInfo(params: {
    address?: string;
    strategy: string;
    propertyTokens: string;
    maxUSDC: string;
    minUSDC: string;
  }): Promise<{
    type: "component";
    component: string;
    props: Record<string, unknown>;
  }> {
    try {
      //   return `Yield automation
      // Wallet:  ${params.address}
      // Strategy: ${params.strategy}
      // Property Tokens: ${params.propertyTokens} tokens
      // Min USDC: ${params.minUSDC}
      // Max USDC: ${params.maxUSDC}`;
      return {
        type: "component",
        component: "SignTX",
        props: {
          address: params.address,
          strategy: params.strategy,
          propertyTokens: params.propertyTokens,
          minUSDC: params.minUSDC,
          maxUSDC: params.maxUSDC,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to fetch property investments: ${error.message}`
        );
      }
      throw new Error("Failed to fetch property investments: Unknown error");
    }
  }

  @CreateAction({
    name: "get_invested_properties",
    description: `Get information about invested properties from the Base mainnet smart contract.
    Thought process:
    1. Use address from check_wallet_connection as default or always when check for invested properties.
    2. If address provided:
       - Query token name, balance, total supply, and decimals
       - Calculate ownership percentage
       - Format and return detailed investment information
    
    Example valid responses:
    - Without address: "Please provide a wallet address to check property investments. Usage: 'Check investments for 0x...''"
    - With invalid address: "Please provide a valid Ethereum wallet address starting with '0x'"
    - With valid address: Returns full investment details
    
    Important: This action requires a valid Ethereum wallet address to proceed. Use address from get_wallet_session`,
    schema: z.object({
      address: z
        .string()
        .optional()
        .describe("The wallet address to check property investments for"),
    }),
  })
  async getInvestedProperties(params: { address?: string }): Promise<string> {
    if (!params.address) {
      return `Please provide a wallet address to check property investments. 
Usage: "Check investments for 0x..."`;
    }

    if (!params.address.startsWith("0x")) {
      return `Please provide a valid Ethereum wallet address starting with '0x'`;
    }

    try {
      const client = createPublicClient({
        chain: base,
        transport: http(),
      });

      // Ensure address is properly formatted as hex
      const formattedAddress = params.address as Address;

      // Get token data including total supply
      const [name, balance, decimals, totalSupply] = await Promise.all([
        client.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "name",
        }),
        client.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "balanceOf",
          args: [formattedAddress],
        }),
        client.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "decimals",
        }),
        client.readContract({
          address: CONTRACT_ADDRESS,
          abi: CONTRACT_ABI,
          functionName: "totalSupply",
        }),
      ]);

      // Convert balance and total supply to human readable format
      const divisor = Math.pow(10, Number(decimals));
      const tokenBalance = Number(balance) / divisor;
      const totalTokenSupply = Number(totalSupply) / divisor;
      const ownershipPercentage = (tokenBalance / totalTokenSupply) * 100;
      const totalValueUSD = tokenBalance * TOKEN_PRICE_USD;

      return `Investment Portfolio for ${params.address}:
Property Token: ${name}
Tokens Owned: ${tokenBalance.toFixed(4)} tokens
Total Supply: ${totalTokenSupply.toFixed(4)} tokens
Ownership Percentage: ${ownershipPercentage.toFixed(2)}%
Total Value: $${totalValueUSD.toFixed(2)} (at $10 per token)`;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to fetch property investments: ${error.message}`
        );
      }
      throw new Error("Failed to fetch property investments: Unknown error");
    }
  }
}
