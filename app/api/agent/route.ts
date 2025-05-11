import { AgentRequest, AgentResponse, ActionRequired } from "@/app/types/api";
import { NextResponse } from "next/server";
import { createAgent } from "./create-agent";
import { cookies } from "next/headers";

const WALLET_SESSION_COOKIE = 'wallet_session';

function tryParseJSON(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

/**
 * Gets MetaMask wallet session data from the request cookies
 * @returns Wallet session data if available
 */
const getWalletSessionData = () => {
  try {
    const sessionCookie = cookies().get(WALLET_SESSION_COOKIE);
    
    if (!sessionCookie?.value) {
      return null;
    }
    console.log(sessionCookie.value,"----------------------")
    return JSON.parse(sessionCookie.value);
  } catch (error) {
    console.error('Error retrieving wallet session data:', error);
    return null;
  }
};

/**
 * Handles incoming POST requests to interact with the AgentKit-powered AI agent.
 * This function processes user messages and streams responses from the agent.
 *
 * @function POST
 * @param {Request & { json: () => Promise<AgentRequest> }} req - The incoming request object containing the user message.
 * @returns {Promise<NextResponse<AgentResponse>>} JSON response containing the AI-generated reply or an error message.
 *
 * @description Sends a single message to the agent and returns the agents' final response.
 *
 * @example
 * const response = await fetch("/api/agent", {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({ userMessage: input }),
 * });
 */
export async function POST(
  req: Request & { json: () => Promise<AgentRequest> }
): Promise<NextResponse<AgentResponse>> {
  try {
    // 1️. Extract user message from the request body
    const { userMessage, actionPayload } = await req.json();

    // 2. Check wallet connection status
    const walletSession = getWalletSessionData();
    const walletConnected = !!walletSession;
    
    // 3. Get the agent
    const agent = await createAgent();

    // Helper function to check if a message indicates a need for wallet connection
    const needsWalletConnection = (message: string): boolean => {
      const lowerMessage = message.toLowerCase();
      return (
        lowerMessage.includes("connect your wallet") ||
        lowerMessage.includes("wallet connection") ||
        lowerMessage.includes("connect metamask") ||
        lowerMessage.includes("need to connect") ||
        lowerMessage.includes("requires wallet") ||
        lowerMessage.includes("please connect your")
      );
    };
    
    // Helper function to detect on-chain action requirements
    const extractActionRequirement = (message: string): ActionRequired | undefined => {
      // Check for transaction patterns
      if (
        message.includes("submit a transaction") ||
        message.includes("execute transaction") ||
        message.includes("send transaction") ||
        message.includes("approve transaction")
      ) {
        try {
          // Look for transaction payload in JSON format
          const match = message.match(/\{.*\}/s);
          if (match) {
            const json = JSON.parse(match[0]);
            if (json.to && (json.value !== undefined || json.data)) {
              return { type: 'transaction', payload: json };
            }
          }
        } catch (e) {
          // JSON parse failed, no action detected
        }
      }
      
      // Check for signature patterns
      if (
        message.includes("sign a message") ||
        message.includes("signature required") ||
        message.includes("please sign") ||
        message.includes("need to sign")
      ) {
        try {
          // Extract message to sign
          const match = message.match(/"(.*?)"/s); // Extract text between quotes
          if (match) {
            return { type: 'signature', payload: { message: match[1] } };
          }
        } catch (e) {
          // Extraction failed, no action detected
        }
      }
      
      return undefined;
    };

    // 4. Start streaming the agent's response
    const stream = await agent.stream(
      { messages: [{ content: userMessage, role: "user" }] }, // The new message to send to the agent
      { configurable: { thread_id: "AgentKit Discussion" } } // Customizable thread ID for tracking conversations
    );

    // 5. Process the streamed response chunks into a single message
    let agentResponse = "";

    for await (const chunk of stream) {
      if ("tools" in chunk) {
        const content = chunk.tools.messages[0].content;

        // Try to parse tool response as JSON
        const jsonResponse = tryParseJSON(content);
        if (jsonResponse) {
          return NextResponse.json({
            response: jsonResponse,
          });
        }
      } else if ("agent" in chunk) {
        const content = chunk.agent.messages[0].content;
        agentResponse += content;

        // Check for component responses
        const jsonResponse = tryParseJSON(agentResponse);
        if (
          jsonResponse &&
          typeof jsonResponse === "object" &&
          "type" in jsonResponse &&
          jsonResponse.type === "component"
        ) {
          return NextResponse.json({
            response: {
              type: "component",
              component: jsonResponse.component,
              props: jsonResponse.props || {},
              sender: "agent",
            },
          });
        }
      }
    }

    // 6. Process the final text response and check for wallet requirement
    const requiresWalletConnection = !walletConnected && needsWalletConnection(agentResponse);
    
    // 7. Check for action requirements (transaction/signature)
    const actionRequired = walletConnected ? extractActionRequirement(agentResponse) : undefined;
    
    // 8. Return the structured response
    return NextResponse.json({
      response: {
        text: agentResponse,
        sender: "agent",
        walletStatus: {
          isConnected: walletConnected,
          address: walletSession?.walletAddress || null,
          chainId: walletSession?.chainId || null,
        },
        requiresWalletConnection,
        actionRequired,
      },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({
      response: {
        text: "Failed to process message. Please try again.",
        sender: "agent",
        error: error instanceof Error ? error.message : "Unknown error",
      },
    });
  }
}
