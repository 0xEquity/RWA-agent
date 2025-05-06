import { useState } from "react";
import { AgentRequest, AgentResponse } from "../types/api";

export interface ComponentMessage {
  type: "component";
  component: string;
  props: Record<string, unknown>;
  sender: "agent";
}

export interface TextMessage {
  text: string;
  sender: "user" | "agent";
}

export type Message = TextMessage | ComponentMessage;

async function messageAgent(userMessage: string): Promise<Message | null> {
  try {
    const response = await fetch("/api/agent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage } as AgentRequest),
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

  const sendMessage = async (input: string) => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, sender: "user" }]);
    setIsThinking(true);

    const responseMessage = await messageAgent(input);
    if (responseMessage) {
      setMessages(prev => [...prev, responseMessage]);
    }

    setIsThinking(false);
  };

  return { messages, sendMessage, isThinking };
}
