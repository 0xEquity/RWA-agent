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

// Define property data
const PROPERTY_DATA = {
  title: "158 Nelson St.",
  address: "Syracuse, NY 13204, USA",
  riskProfile: "Low",
  minInvestment: 10.00,
  symbol: "WXRWA1",
  totalSupply: 13750,
  totalCost: 137500,
  decimals: 0,
  currency: "USD",
  costPerToken: 10,
  addresses: {
    8453: '0xce827d203dC317CB8823098DCbE88fD3aE447482',
    42161: '0xce827d203dC317CB8823098DCbE88fD3aE447482'
  },
  investment: {
    originalCost: 125000,
    sourcingFee: 12500
  },
  income: {
    yearly: {
      gross: 20400,
      net: 14272
    },
    monthly: {
      gross: 1700,
      net: 1189.33
    }
  },
  expense: {
    yearly: {
      management: 1632,
      insurance: 1320,
      propertyTax: 1700,
      utilities: 480,
      platformFee: 382,
      maintenanceReserve: 204,
      monthlyAdministration: 408
    },
    monthly: {
      management: 136,
      insurance: 110,
      propertyTax: 141.67,
      utilities: 40,
      platformFee: 32,
      maintenanceReserve: 17,
      monthlyAdministration: 34
    }
  },
  titleDeed: "https://0x-property-docs.s3.us-west-2.amazonaws.com/WXRWA1/WXRWA1-TitleDeed.pdf",
  salesContract: "https://0x-property-docs.s3.us-west-2.amazonaws.com/WXRWA1/WXRWA1-Property-Sales-Contract.pdf"
};

// Define property images
const PROPERTY_IMAGES = [
  {
    id: 1,
    original: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/2-980x652.jpg",
    thumbnail: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/2-360x240.jpg",
  },
  {
    id: 2,
    original: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/3-980x652.jpg",
    thumbnail: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/3-360x240.jpg",
  },
  {
    id: 3,
    original: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/4-980x652.jpg",
    thumbnail: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/4-360x240.jpg",
  },
  {
    id: 4,
    original: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/5-980x652.jpg",
    thumbnail: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/5-360x240.jpg",
  },
  {
    id: 5,
    original: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/6-980x652.jpg",
    thumbnail: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/6-360x240.jpg",
  },
  {
    id: 6,
    original: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/7-980x652.jpg",
    thumbnail: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/7-360x240.jpg",
  },
  {
    id: 7,
    original: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/8-980x652.jpg",
    thumbnail: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/8-360x240.jpg",
  },
  {
    id: 8,
    original: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/9-980x652.jpg",
    thumbnail: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/9-360x240.jpg",
  },
  {
    id: 9,
    original: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/10-980x652.jpg",
    thumbnail: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/10-360x240.jpg",
  },
  {
    id: 10,
    original: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/11-980x652.jpg",
    thumbnail: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/11-360x240.jpg",
  },
  {
    id: 11,
    original: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/12-980x652.jpg",
    thumbnail: "https://0xequity-properties.s3.us-west-2.amazonaws.com/wxefr3/12-360x240.jpg",
  }
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

    Example valid responses:
    - Returns a component with detailed property information and images.
    - The component allows users to view property details and consider purchase options.
    
    Important: This action provides comprehensive information about available properties for potential investors.`,
    schema: z.object({}),
  })
  async getPropertyInformation(): Promise<{
    type: "component";
    component: string;
    props: Record<string, unknown>;
  }> {
    try {
      // Create actions array for property display
      const actions = [
        {
          label: "Buy Property Tokens",
          action: "buy_property_tokens"
        },
        {
          label: "Calculate Returns",
          action: "calculate_investment_returns"
        },
        {
          label: "View Title Deed",
          url: PROPERTY_DATA.titleDeed
        },
        {
          label: "View Sales Contract",
          url: PROPERTY_DATA.salesContract
        }
      ];

      return {
        type: "component",
        component: "PropertyDisplay",
        props: {
          property: PROPERTY_DATA,
          images: PROPERTY_IMAGES,
          actions: actions
        }
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch property information: ${error.message}`);
      }
      throw new Error("Failed to fetch property information: Unknown error");
    }
  }

  @CreateAction({
    name: "calculate_investment_returns",
    description: `Calculate potential investment returns based on investment amount and time period.
    Thought process:
    1. This action is triggered when a user wants to calculate potential returns on their investment.
    2. The action requires two inputs:
       - Investment amount in USD (minimum $10)
       - Investment period in years (1-30)
    3. The calculator will provide:
       - Number of tokens the investment would purchase
       - Monthly and yearly rental income
       - Total return over the specified period
       - ROI percentage
    
    Example valid responses:
    - With valid inputs: Returns detailed investment projection
    - With invalid investment amount: "Please provide a valid investment amount of at least $10."
    - With invalid time period: "Please provide a valid time period between 1 and 30 years."
    
    Important: This action helps users understand the potential returns from their investment in property tokens.`,
    schema: z.object({
      investmentAmount: z
        .string()
        .describe("The amount in USD the user wants to invest (minimum $10)"),
      timePeriodYears: z
        .string()
        .describe("The time period in years for the investment (1-30)"),
    }),
  })
  async calculateInvestmentReturns(params: {
    investmentAmount: string;
    timePeriodYears: string;
  }): Promise<{
    type: "component";
    component: string;
    props: Record<string, unknown>;
  }> {
    try {
      const amount = parseFloat(params.investmentAmount);
      const years = parseInt(params.timePeriodYears);
      
      // Validate inputs
      if (isNaN(amount) || amount < PROPERTY_DATA.minInvestment) {
        throw new Error(`Please provide a valid investment amount of at least $${PROPERTY_DATA.minInvestment.toFixed(2)}.`);
      }
      
      if (isNaN(years) || years < 1 || years > 30) {
        throw new Error("Please provide a valid time period between 1 and 30 years.");
      }
      
      // Calculate returns
      const tokensReceived = amount / PROPERTY_DATA.costPerToken;
      const percentageOwnership = (tokensReceived / PROPERTY_DATA.totalSupply) * 100;
      
      // Annual yield is 10% as specified
      const annualYield = 0.10;
      const monthlyIncome = (amount * annualYield) / 12;
      const yearlyIncome = amount * annualYield;
      const totalReturn = yearlyIncome * years;
      const roi = (totalReturn / amount) * 100;
      
      return {
        type: "component",
        component: "InvestmentCalculator",
        props: {
          input: {
            investmentAmount: amount,
            timePeriodYears: years,
          },
          results: {
            tokensReceived: tokensReceived.toFixed(2),
            percentageOwnership: percentageOwnership.toFixed(4),
            monthlyIncome: monthlyIncome.toFixed(2),
            yearlyIncome: yearlyIncome.toFixed(2),
            totalReturn: totalReturn.toFixed(2),
            roi: roi.toFixed(2),
            projectedValue: (amount + totalReturn).toFixed(2)
          },
          property: {
            title: PROPERTY_DATA.title,
            address: PROPERTY_DATA.address,
            costPerToken: PROPERTY_DATA.costPerToken
          },
          onBuyNow: () => {},
          onRecalculate: () => {}
        }
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to calculate investment returns: ${error.message}`);
      }
      throw new Error("Failed to calculate investment returns: Unknown error");
    }
  }
}
