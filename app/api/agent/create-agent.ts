import { getLangChainTools } from "@coinbase/agentkit-langchain";
import { MemorySaver } from "@langchain/langgraph";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { prepareAgentkitAndWalletProvider } from "./prepare-agentkit";

/**
 * Agent Configuration Guide
 *
 * This file handles the core configuration of your AI agent's behavior and capabilities.
 *
 * Key Steps to Customize Your Agent:
 *
 * 1. Select your LLM:
 *    - Modify the `ChatOpenAI` instantiation to choose your preferred LLM
 *    - Configure model parameters like temperature and max tokens
 *
 * 2. Instantiate your Agent:
 *    - Pass the LLM, tools, and memory into `createReactAgent()`
 *    - Configure agent-specific parameters
 */

// The agent
let agent: ReturnType<typeof createReactAgent>;

/**
 * Initializes and returns an instance of the AI agent.
 * If an agent instance already exists, it returns the existing one.
 *
 * @function getOrInitializeAgent
 * @returns {Promise<ReturnType<typeof createReactAgent>>} The initialized AI agent.
 *
 * @description Handles agent setup
 *
 * @throws {Error} If the agent initialization fails.
 */
export async function createAgent(): Promise<ReturnType<typeof createReactAgent>> {
  // If agent has already been initialized, return it
  if (agent) {
    return agent;
  }

  try {
    const { agentkit } = await prepareAgentkitAndWalletProvider();

    // Initialize LLM: https://platform.openai.com/docs/models#gpt-4o
    const llm = new ChatOpenAI({ model: "gpt-4o-mini" });

    const tools = await getLangChainTools(agentkit);
    const memory = new MemorySaver();

    // Initialize Agent
    agent = createReactAgent({
      llm,
      tools,
      checkpointSaver: memory,
      messageModifier: `
        You are a helpful 0xequity agent that interacts onchain. You are an expert in 0xequity and help guide users to invest, leverage, or boost their income using 0xequity. You have access to tools that can help you perform actions on-chain.0xequity is a blockchain-based platform that allows users to invest in real-world assets (RWAs), primarily focusing on tokenized real estate. It enables fractional ownership starting from just $10 and provides secure, compliant, and transparent investment opportunities. Users can earn yield via rental income, enjoy liquidity through token trading, and use DeFi functionalities like borrowing or staking.
The platform issues two key tokens:WXRWA – A wallet-compatible token representing the investor’s share in an RWA. It earns rental yields and can be traded or used as collateral for DeFi loans in the future.
XRWA – A legal equity token redeemable upon holding a substantial share of WXRWA (10%+ of total supply) and having a US-based legal entity or ITIN. It acts as digital proof of ownership of a Delaware LLC holding the real-world property.
Users must complete KYC verification to invest or receive tokens. The platform supports both crypto (USDT, USDC, ETH, BTC) and fiat (via bank transfers) for funding, with compatibility across Arbitrum and BASE blockchains.
Users receive real-time USDC rental income, stored in lock-NFTs, which can be redeemed post a defined period. Tokens can be traded on secondary markets or redeemed on the platform with various fee structures, including zero-fee limit orders.
xWallet simplifies onboarding by using passkeys or Google/Apple ID logins instead of traditional wallets, making it accessible for both crypto-savvy and non-technical users.
0xequity’s vision is to democratize access to global real estate, reduce financial barriers, enhance returns through DeFi integration, and create a seamless, transparent digital investment experience for users worldwide—except for restricted jurisdictions.
If you're ever unsure about a user's question, consult docs.0xequity.com. Dont use the wallet from viem provider choose wallet from connect_metamask action. 
        `,
    });

    return agent;
  } catch (error) {
    console.error("Error initializing agent:", error);
    throw new Error("Failed to initialize agent");
  }
}
