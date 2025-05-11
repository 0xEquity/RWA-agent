import {
  ActionProvider,
  AgentKit,
  cdpApiActionProvider,
  erc20ActionProvider,
  pythActionProvider,
  ViemWalletProvider,
  WalletProvider,
  WalletActionProvider,
  wethActionProvider,
} from "@coinbase/agentkit";
import { ConnectWalletActionProvider } from "@/app/action-providers/connectWalletActionProvider";
import { XWalletActionProvider } from "@/app/action-providers/xWalletActionProvider";
import { ZeroXEquityActionProvider } from "@/app/action-providers/0xEquityActionProvider";
//import { MetaMaskWalletProvider } from "@/app/lib/agentkit/providers/MetaMaskWalletProvider";
import { cookies } from "next/headers";
import fs from "fs";
import { createWalletClient, Hex, http } from "viem";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";
import { base } from "viem/chains";

/**
 * AgentKit Integration Route
 *
 * This file is your gateway to integrating AgentKit with your product.
 * It defines the core capabilities of your agent through WalletProvider
 * and ActionProvider configuration.
 *
 * Key Components:
 * 1. WalletProvider Setup:
 *    - Configures the blockchain wallet integration
 *    - Learn more: https://github.com/coinbase/agentkit/tree/main/typescript/agentkit#evm-wallet-providers
 *
 * 2. ActionProviders Setup:
 *    - Defines the specific actions your agent can perform
 *    - Choose from built-in providers or create custom ones:
 *      - Built-in: https://github.com/coinbase/agentkit/tree/main/typescript/agentkit#action-providers
 *      - Custom: https://github.com/coinbase/agentkit/tree/main/typescript/agentkit#creating-an-action-provider
 *
 * # Next Steps:
 * - Explore the AgentKit README: https://github.com/coinbase/agentkit
 * - Experiment with different LLM configurations
 * - Fine-tune agent parameters for your use case
 *
 * ## Want to contribute?
 * Join us in shaping AgentKit! Check out the contribution guide:
 * - https://github.com/coinbase/agentkit/blob/main/CONTRIBUTING.md
 * - https://discord.gg/CDP
 */

// Configure a file to persist a user's private key if none provided
const WALLET_DATA_FILE = "wallet_data.txt";
const WALLET_SESSION_COOKIE = "wallet_session";

/**
 * Gets MetaMask wallet session data from the request cookies
 * @returns Wallet address and chain ID from the session, or null if no session exists
 */
const getWalletSessionData = (): {
  walletAddress: string | null;
  chainId: number | null;
} => {
  try {
    // Get the wallet session cookie
    const sessionCookie = cookies().get(WALLET_SESSION_COOKIE);

    if (!sessionCookie?.value) {
      return { walletAddress: null, chainId: null };
    }

    // Parse the session data
    const session = JSON.parse(sessionCookie.value);

    return {
      walletAddress: session.walletAddress || null,
      chainId: session.chainId || null,
    };
  } catch (error) {
    console.error("Error retrieving wallet session data:", error);
    return { walletAddress: null, chainId: null };
  }
};

/**
 * Prepares the AgentKit and WalletProvider.
 *
 * @function prepareAgentkitAndWalletProvider
 * @returns {Promise<{ agentkit: AgentKit, walletProvider: WalletProvider }>} The initialized AI agent.
 *
 * @description Handles agent setup
 *
 * @throws {Error} If the agent initialization fails.
 */
export async function prepareAgentkitAndWalletProvider(): Promise<{
  agentkit: AgentKit;
}> {
  try {
    // Check for MetaMask wallet session first
    const { walletAddress, chainId } = getWalletSessionData();

    // Initialize the appropriate wallet provider based on the session
    let walletProvider: WalletProvider | undefined = undefined;
    let isMetaMaskProvider = false;

    if (walletAddress && chainId) {
      // If we have a MetaMask session, use the MetaMask wallet provider
      console.log(
        `Using MetaMask wallet provider with address: ${walletAddress} and chainId: ${chainId}`
      );
      // walletProvider = new MetaMaskWalletProvider(walletAddress, chainId);
      isMetaMaskProvider = true;
    }
    // Otherwise, use the default Viem wallet provider with the private key
    console.log("No MetaMask session found, using default wallet provider");

    // Initialize WalletProvider with private key as before
    let privateKey = process.env.PRIVATE_KEY as Hex;
    if (!privateKey) {
      if (fs.existsSync(WALLET_DATA_FILE)) {
        privateKey = JSON.parse(
          fs.readFileSync(WALLET_DATA_FILE, "utf8")
        ).privateKey;
        console.info("Found private key in wallet_data.txt");
      } else {
        privateKey = generatePrivateKey();
        fs.writeFileSync(WALLET_DATA_FILE, JSON.stringify({ privateKey }));
        console.log("Created new private key and saved to wallet_data.txt");
        console.log(
          "We recommend you save this private key to your .env file and delete wallet_data.txt afterwards."
        );
      }
    }

    const account = privateKeyToAccount(privateKey);
    const client = createWalletClient({
      account,
      chain: base,
      transport: http(),
    });
    walletProvider = new ViemWalletProvider(client);
    // Set up action providers - all actions are available regardless of wallet provider
    const actionProviders: ActionProvider[] = [
      wethActionProvider(),
      pythActionProvider(),
      erc20ActionProvider(),
      // new WalletActionProvider(),
      new ConnectWalletActionProvider(),
      new XWalletActionProvider(),
      new ZeroXEquityActionProvider(),
    ];

    const canUseCdpApi =
      process.env.CDP_API_KEY_NAME && process.env.CDP_API_KEY_PRIVATE_KEY;
    if (canUseCdpApi) {
      actionProviders.push(
        cdpApiActionProvider({
          apiKeyName: process.env.CDP_API_KEY_NAME,
          apiKeyPrivateKey: process.env.CDP_API_KEY_PRIVATE_KEY,
        })
      );
    }

    // Create AgentKit with the selected wallet provider
    const agentkit = await AgentKit.from({
      walletProvider,
      actionProviders,
    });

    return { agentkit };
  } catch (error) {
    console.error("Error initializing agent:", error);
    throw new Error("Failed to initialize agent");
  }
}
