import { useState } from "react";
import { 
  AgentRequest, 
  AgentResponse,
  WalletStatus,
  ActionRequired,
  TransactionActionPayload,
  SignatureActionPayload 
} from "../types/api";

export interface ComponentMessage {
  type: "component";
  component: string;
  props: Record<string, unknown>;
  sender: "agent";
}

export interface TextMessage {
  text: string;
  sender: "user" | "agent";
  walletStatus?: WalletStatus;
  requiresWalletConnection?: boolean;
  actionRequired?: ActionRequired;
  error?: string;
}

export type Message = TextMessage | ComponentMessage;

async function messageAgent(userMessage: string, actionPayload?: unknown): Promise<Message | null> {
  try {
    const response = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage, actionPayload } as AgentRequest),
    });

    const data = (await response.json()) as AgentResponse;
    return data.response;
  } catch (error) {
    console.error("Error communicating with agent:", error);
    return null;
  }
}

export function useAgent() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  // Handle submitting action payloads (transaction results, signatures)
  const submitActionResult = async (
    actionType: string,
    success: boolean,
    result?: string
  ) => {
    setIsThinking(true);
    
    // Create a payload that tells the agent what happened with the action
    const actionPayload = {
      type: actionType, // 'transaction' or 'signature'
      success,
      result: result || null,
    };

    // Send a follow-up message to the agent with the action result
    const userMessage = success
      ? `The ${actionType} was successful.`
      : `I rejected the ${actionType}.`;

    const responseMessage = await messageAgent(userMessage, actionPayload);
    if (responseMessage) {
      setMessages(prev => [...prev, responseMessage]);
    }
    
    setIsThinking(false);
  };

  const sendMessage = async (input: string) => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, sender: "user" }]);
    setIsThinking(true);

    const responseMessage = await messageAgent(input);
    if (responseMessage) {
      // Check if we need to display wallet-related components instead of raw response
      if ('text' in responseMessage) {
        if (responseMessage.requiresWalletConnection) {
          // Add wallet connection prompt component
          setMessages(prev => [
            ...prev, 
            {
              type: "component",
              component: "WalletRequiredPrompt",
              props: {
                onWalletConnected: async () => {
                  // When wallet is connected, resubmit the last user message
                  await sendMessage("I've connected my wallet, please continue.");
                },
              },
              sender: "agent"
            } as ComponentMessage
          ]);
          
          // Still add the original message
          setMessages(prev => [...prev, responseMessage]);
        }
        else if (responseMessage.actionRequired) {
          // For transaction requests
          if (responseMessage.actionRequired.type === 'transaction') {
            const payload = responseMessage.actionRequired.payload as TransactionActionPayload;
            setMessages(prev => [
              ...prev, 
              {
                type: "component",
                component: "TransactionRequest",
                props: {
                  payload,
                  onComplete: (success: boolean, txHash?: string) => {
                    submitActionResult('transaction', success, txHash);
                  }
                },
                sender: "agent"
              } as ComponentMessage
            ]);
          }
          // For signature requests
          else if (responseMessage.actionRequired.type === 'signature') {
            const payload = responseMessage.actionRequired.payload as SignatureActionPayload;
            setMessages(prev => [
              ...prev, 
              {
                type: "component",
                component: "SignatureRequest",
                props: {
                  payload,
                  onComplete: (success: boolean, signature?: string) => {
                    submitActionResult('signature', success, signature);
                  }
                },
                sender: "agent"
              } as ComponentMessage
            ]);
          }
          
          // Still add the original message
          setMessages(prev => [...prev, responseMessage]);
        }
        else {
          // Regular text message
          setMessages(prev => [...prev, responseMessage]);
        }
      } 
      else {
        // Component message
        setMessages(prev => [...prev, responseMessage]);
      }
    }

    setIsThinking(false);
  };

  return { messages, sendMessage, isThinking };
}
