import { ActionProvider, CreateAction } from "@coinbase/agentkit";
import { z } from "zod";
import {
  createPublicClient,
  http,
  parseAbi,
  Address,
  StringToBytesOpts,
} from "viem";
import { base } from "viem/chains";
import { cookies } from "next/headers";

// Minimal ERC20 ABI for the functions we need
const CONTRACT_ABI = parseAbi([
  "function balanceOf(address account) view returns (uint256)",
  "function name() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
]);

const GetBalanceSchema = z
  .object({
    contractAddress: z
      .string()
      .describe("The contract address of the token to get the balance for"),
  })
  .strip()
  .describe("Instructions for getting wallet balance");
const CONTRACT_ADDRESS = "0xce827d203dc317cb8823098dcbe88fd3ae447482";
const TOKEN_PRICE_USD = 10; // Fixed price as specified

// Define property data
const PROPERTY_DATA = {
  title: "158 Nelson St.",
  address: "Syracuse, NY 13204, USA",
  riskProfile: "Low",
  minInvestment: 10.0,
  symbol: "WXRWA1",
  totalSupply: 13750,
  totalCost: 137500,
  decimals: 0,
  currency: "USD",
  costPerToken: 10,
  addresses: {
    8453: "0xce827d203dC317CB8823098DCbE88fD3aE447482",
    42161: "0xce827d203dC317CB8823098DCbE88fD3aE447482",
  },
  investment: {
    originalCost: 125000,
    sourcingFee: 12500,
  },
  income: {
    yearly: {
      gross: 20400,
      net: 14272,
    },
    monthly: {
      gross: 1700,
      net: 1189.33,
    },
  },
  expense: {
    yearly: {
      management: 1632,
      insurance: 1320,
      propertyTax: 1700,
      utilities: 480,
      platformFee: 382,
      maintenanceReserve: 204,
      monthlyAdministration: 408,
    },
    monthly: {
      management: 136,
      insurance: 110,
      propertyTax: 141.67,
      utilities: 40,
      platformFee: 32,
      maintenanceReserve: 17,
      monthlyAdministration: 34,
    },
  },
  titleDeed:
    "https://0x-property-docs.s3.us-west-2.amazonaws.com/WXRWA1/WXRWA1-TitleDeed.pdf",
  salesContract:
    "https://0x-property-docs.s3.us-west-2.amazonaws.com/WXRWA1/WXRWA1-Property-Sales-Contract.pdf",
};

// Define property images
const PROPERTY_IMAGES = [
  {
    id: 1,
    original:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/2-980x652.jpg",
    thumbnail:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/2-360x240.jpg",
  },
  {
    id: 2,
    original:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/3-980x652.jpg",
    thumbnail:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/3-360x240.jpg",
  },
  {
    id: 3,
    original:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/4-980x652.jpg",
    thumbnail:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/4-360x240.jpg",
  },
  {
    id: 4,
    original:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/5-980x652.jpg",
    thumbnail:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/5-360x240.jpg",
  },
  {
    id: 5,
    original:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/6-980x652.jpg",
    thumbnail:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/6-360x240.jpg",
  },
  {
    id: 6,
    original:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/7-980x652.jpg",
    thumbnail:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/7-360x240.jpg",
  },
  {
    id: 7,
    original:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/8-980x652.jpg",
    thumbnail:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/8-360x240.jpg",
  },
  {
    id: 8,
    original:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/9-980x652.jpg",
    thumbnail:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/9-360x240.jpg",
  },
  {
    id: 9,
    original:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/10-980x652.jpg",
    thumbnail:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/10-360x240.jpg",
  },
  {
    id: 10,
    original:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/11-980x652.jpg",
    thumbnail:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/11-360x240.jpg",
  },
  {
    id: 11,
    original:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/12-980x652.jpg",
    thumbnail:
      "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/12-360x240.jpg",
  },
];

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

  @CreateAction({
    name: "get_property_information",
    description: `Provides detailed information about available properties for investment on the 0xEquity platform.
    Thought process:
    1. This action is triggered when a user expresses interest in buying or investing in a property.
    2. The action will provide information about the property including:
       - Property details (title, address, risk profile)
       - Financial information (minimum investment, total supply, cost per token)
       - Income projections (yearly/monthly gross and net income)
       - Expense breakdown (management, insurance, taxes, utilities, etc.)
       - Links to important documents (title deed, sales contract)
       - Property images
    3. After displaying property information, it will ask the user:
       - How much they want to invest
       - Which property they're interested in (if multiple properties available)
    4. Upon user response, it will calculate:
       - Number of tokens they'll receive
       - Monthly and yearly rental yield
       - Return on investment
    5. This prepares for the next step where users can confirm the investment,
       check their wallet balance, and sign a transaction if they decide to invest.

    Example valid responses:
    - Returns a component with detailed property information and images.
    - Follows up with an investment amount query to continue the flow.
    
    Important: This action provides comprehensive information about available properties and begins the investment flow.`,
    schema: z.object({}),
  })
  async getPropertyInformation(): Promise<
    | {
        type: "component";
        component: string;
        props: Record<string, unknown>;
      }
    | string
  > {
    try {
      // Step 1: Display property information
      // Instead of returning a component with action buttons, we're going to return the component
      // and then follow up with investment questions

      return {
        type: "component",
        component: "PropertyDisplay",
        props: {
          property: PROPERTY_DATA,
          images: PROPERTY_IMAGES,
          actions: [], // No action buttons as we'll handle the flow differently
          followUpMessage:
            "I've shown you details about this property. How much would you like to invest ? (minimum $10)",
        },
      };

      // The assistant will follow up asking for investment amount
      // Then will use calculateInvestmentReturns action with the user's input
      // This creates a conversation flow to guide the user through the investment process
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to fetch property information: ${error.message}`
        );
      }
      throw new Error("Failed to fetch property information: Unknown error");
    }
  }

  @CreateAction({
    name: "process_investment_intent",
    description: `Process a user's intent to invest in a property by calculating returns and preparing for transaction.
    Thought process:
    1. This action is triggered after a user expresses interest in investing and provides an amount.
    2. It checks if a wallet is connected or provided via the address parameter.
    3. It calculates investment returns based on the amount specified and investment duration.
    4. It asks the user if they want to proceed with the investment.
    
    Example valid responses:
    - With valid inputs: Returns detailed investment projection and asks for confirmation
    - With invalid investment amount: "Please provide a valid investment amount of at least $10."
    - Without wallet address: "Please connect your wallet first to continue with the investment"
    
    Important: This action processes investment intents and moves the user toward transaction execution.`,
    schema: z.object({
      investmentAmount: z
        .string()
        .describe("The amount in USD the user wants to invest (minimum $10)"),
      investmentPeriodYears: z
        .string()
        .describe("The number of years the user plans to keep the investment"),
      address: z
        .string()
        .optional()
        .describe(
          "The wallet address to use for the transaction. If not provided, will try to get from session"
        ),
      propertyId: z
        .string()
        .optional()
        .describe(
          "The ID of the property to invest in (optional if only one property available)"
        ),
    }),
  })
  async processInvestmentIntent(params: {
    investmentAmount: string;
    investmentPeriodYears: string;
    address?: string;
    propertyId?: string;
  }): Promise<
    | string
    | {
        type: "component";
        component: string;
        props: Record<string, unknown>;
      }
  > {
    try {
      const amount = parseFloat(params.investmentAmount);
      const investmentYears = parseFloat(params.investmentPeriodYears);
      let walletAddress = params.address;

      // Validate inputs
      if (isNaN(amount) || amount < PROPERTY_DATA.minInvestment) {
        return `Please provide a valid investment amount of at least $${PROPERTY_DATA.minInvestment.toFixed(2)}.`;
      }

      if (isNaN(investmentYears) || investmentYears <= 0) {
        return "Please provide a valid investment period in years (must be a positive number).";
      }

      // If no wallet address is provided, check session data
      if (!walletAddress) {
        const cookieStore = cookies();
        const walletSession = cookieStore.get("wallet_session")?.value;

        if (!walletSession) {
          return "Please connect your wallet first to continue with your investment. Use connect_metamask or connect_xwallet to connect.";
        }

        const sessionData = JSON.parse(walletSession);
        walletAddress = sessionData.walletAddress;

        if (!walletAddress) {
          return "No wallet address found in session. Please connect your wallet first to continue with your investment.";
        }
      }

      // Property selection logic - currently we only have one property
      // but this could be expanded to handle multiple properties
      const selectedProperty = PROPERTY_DATA;

      // Calculate returns
      const tokensReceived = amount / selectedProperty.costPerToken;
      const percentageOwnership =
        (tokensReceived / selectedProperty.totalSupply) * 100;

      // Annual yield is 10%
      const annualYield = 0.1;
      const monthlyIncome = (amount * annualYield) / 12;
      const yearlyIncome = amount * annualYield;
      const totalIncome = yearlyIncome * investmentYears;
      const roi = (totalIncome / amount) * 100;
      const projectedValue = amount + totalIncome;

      // Prepare investment summary
      return {
        type: "component",
        component: "InvestmentCalculator",
        props: {
          input: {
            investmentAmount: amount,
            timePeriodYears: investmentYears,
            walletAddress: walletAddress, // Pass along wallet address for next step
          },
          results: {
            tokensReceived: tokensReceived.toFixed(2),
            percentageOwnership: percentageOwnership.toFixed(4),
            monthlyIncome: monthlyIncome.toFixed(2),
            yearlyIncome: yearlyIncome.toFixed(2),
            totalReturn: totalIncome.toFixed(2),
            roi: roi.toFixed(2),
            projectedValue: projectedValue.toFixed(2),
          },
          property: {
            title: selectedProperty.title,
            address: selectedProperty.address,
            costPerToken: selectedProperty.costPerToken,
          },
          followUpMessage:
            `Based on your $${amount.toFixed(2)} investment over ${investmentYears} years, you would receive ${tokensReceived.toFixed(2)} tokens representing ${percentageOwnership.toFixed(4)}% ownership. Your estimated total return would be $${totalIncome.toFixed(2)} (${roi.toFixed(2)}% ROI), with a projected final value of $${projectedValue.toFixed(2)}. Would you like to proceed with this investment?`,
        },
      };

      // Next steps in the flow:
      // 1. User confirms they want to invest
      // 2. Check wallet balance to see if they have sufficient funds
      // 3. If funds available, present SignTx component for final confirmation
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to process investment intent: ${error.message}`
        );
      }
      throw new Error("Failed to process investment intent: Unknown error");
    }
  }

  @CreateAction({
    name: "prepare_investment_transaction",
    description: `Prepare a transaction for property investment after user confirmation.
    Thought process:
    1. This action is triggered after a user confirms they want to proceed with an investment.
    2. It checks the user's wallet for sufficient USD balance using get_balance.
    3. If funds are available, it prepares a transaction for signing.
    4. It presents the user with a SignTx component to complete the investment.
    
    Example valid responses:
    - With sufficient balance: Returns SignTx component for user to complete transaction
    - With insufficient balance: "You don't have enough funds in your wallet to complete this investment."
    
    Important: This action represents the final step in the investment flow, requiring human confirmation.`,
    schema: z.object({
      investmentAmount: z.string().describe("The amount in USD to invest"),
      address: z
        .string()
        .describe(
          "The wallet address to check balance and process transaction"
        ),
      propertyId: z
        .string()
        .optional()
        .describe(
          "The ID of the property to invest in (optional if only one property available)"
        ),
    }),
  })
  async prepareInvestmentTransaction(params: {
    investmentAmount: string;
    address: string;
    propertyId?: string;
  }): Promise<
    | string
    | {
        type: "component";
        component: string;
        props: Record<string, unknown>;
      }
  > {
    try {
      const amount = parseFloat(params.investmentAmount);

      // Validate inputs
      if (isNaN(amount) || amount < PROPERTY_DATA.minInvestment) {
        return `Please provide a valid investment amount of at least $${PROPERTY_DATA.minInvestment.toFixed(2)}.`;
      }

      if (!params.address || !params.address.startsWith("0x")) {
        return "Please provide a valid Ethereum wallet address starting with '0x'";
      }

      // Create client to interact with the blockchain
      const client = createPublicClient({
        chain: base,
        transport: http(),
      });

      // Default USDC contract address on Base
      const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";

      // Check USDC balance to ensure user has enough funds
      try {
        const [balance, decimals] = await Promise.all([
          client.readContract({
            address: USDC_ADDRESS as Address,
            abi: CONTRACT_ABI,
            functionName: "balanceOf",
            args: [params.address as Address],
          }),
          client.readContract({
            address: USDC_ADDRESS as Address,
            abi: CONTRACT_ABI,
            functionName: "decimals",
          }),
        ]);

        // Format balance based on decimals
        const divisor = Math.pow(10, Number(decimals));
        const usdcBalance = Number(balance) / divisor;

        // Check if user has enough USDC
        if (usdcBalance < amount) {
          return `You don't have enough USDC to complete this investment. Your balance: ${usdcBalance.toFixed(2)} USDC. Required: ${amount.toFixed(2)} USDC.`;
        }
      } catch (error) {
        return `Error checking your USDC balance: ${error instanceof Error ? error.message : "Unknown error"}. Please make sure your wallet is properly connected and try again.`;
      }

      // If balance is sufficient, prepare transaction for signing
      return {
        type: "component",
        component: "SignTX",
        props: {
          address: params.address,
          investmentAmount: amount.toFixed(2),
          property: {
            title: PROPERTY_DATA.title,
            tokenSymbol: PROPERTY_DATA.symbol,
            contractAddress: CONTRACT_ADDRESS,
          },
          message: `Please confirm your investment of $${amount.toFixed(2)} in ${PROPERTY_DATA.title}. This will purchase approximately ${(amount / PROPERTY_DATA.costPerToken).toFixed(2)} tokens.`,
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to prepare investment transaction: ${error.message}`
        );
      }
      throw new Error(
        "Failed to prepare investment transaction: Unknown error"
      );
    }
  }

  @CreateAction({
    name: "get_balance",
    description: `
    Check your USDC balance on Base chain. Use this specific action for USDC balance checks instead of the erc20ActionProvider get_balance function.
    
    This action first verifies that a wallet is connected using either:
    1. The wallet address provided directly in the parameters, or
    2. The wallet address from the session data if no address is provided
    
    If no wallet is connected or provided, it will prompt you to connect your wallet first.
    
    Thought process:
    1. Use provided wallet address or check if a wallet is connected via session
    2. Read the USDC token balance for the wallet address
    3. Format and return the balance information
    
    Example responses:
    - When wallet not connected: "Please connect your wallet first using connect_metamask or connect_xwallet"
    - When wallet connected: "Your USDC balance: 25.5 USDC"
    `,
    schema: z.object({
      walletAddress: z
        .string()
        .optional()
        .describe(
          "Optional wallet address to check balance for. If not provided, will use the address from wallet session"
        ),
    }),
  })
  async getBalance(args: {
    walletAddress: StringToBytesOpts;
  }): Promise<string> {
    try {
      // Default USDC contract address on Base
      const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
      const tokenAddress = USDC_ADDRESS;

      // Use provided wallet address or get from session
      let walletAddress = args.walletAddress;

      // If no wallet address is provided, check session data
      if (!walletAddress) {
        const cookieStore = cookies();
        const walletSession = cookieStore.get("wallet_session")?.value;

        if (!walletSession) {
          return "Please provide a wallet address or connect your wallet first using connect_metamask or connect_xwallet";
        }

        const sessionData = JSON.parse(walletSession);
        walletAddress = sessionData.walletAddress;

        if (!walletAddress) {
          return "No wallet address found in session. Please connect your wallet first or provide a wallet address.";
        }
      }

      // Create client to interact with the blockchain
      const client = createPublicClient({
        chain: base,
        transport: http(),
      });

      // Get token data including balance and decimals
      const [balance, decimals, symbol] = await Promise.all([
        client.readContract({
          address: tokenAddress as Address,
          abi: CONTRACT_ABI,
          functionName: "balanceOf",
          args: [walletAddress as Address],
        }),
        client.readContract({
          address: tokenAddress as Address,
          abi: CONTRACT_ABI,
          functionName: "decimals",
        }),
        client.readContract({
          address: tokenAddress as Address,
          abi: CONTRACT_ABI,
          functionName: "name",
        }),
      ]);

      // Format balance based on decimals
      const divisor = Math.pow(10, Number(decimals));
      const formattedBalance = Number(balance) / divisor;

      return `USDC Balance for ${walletAddress}: ${formattedBalance.toFixed(2)} USDC`;
    } catch (error) {
      if (error instanceof Error) {
        return `Error checking USDC balance: ${error.message}`;
      }
      return "Error checking USDC balance: Unknown error";
    }
  }
}
