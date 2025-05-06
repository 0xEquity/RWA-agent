import { AgentRequest, AgentResponse } from "@/app/types/api";
import { NextResponse } from "next/server";
import { createAgent } from "./create-agent";

function tryParseJSON(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

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
    const { userMessage } = await req.json();

    // 2. Get the agent
    const agent = await createAgent();

    // 3.Start streaming the agent's response
    const stream = await agent.stream(
      { messages: [{ content: userMessage, role: "user" }] }, // The new message to send to the agent
      { configurable: { thread_id: "AgentKit Discussion" } } // Customizable thread ID for tracking conversations
    );

    // 4️. Process the streamed response chunks into a single message
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

        // Try to parse agent response as JSON
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

    // If we haven't returned a component response, return the text response
    return NextResponse.json({
      response: {
        text: agentResponse || toolResponse,
        sender: "agent",
      },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({
      response: {
        text: "Failed to process message",
        sender: "agent",
      },
    });
  }
}
