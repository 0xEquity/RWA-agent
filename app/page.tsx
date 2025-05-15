"use client";

import { useState, useEffect, useRef } from "react";
import { useAgent } from "./hooks/useAgent";
import { useMetaMask } from "./hooks/useMetaMask";
import { ConnectWallet } from "./components/ConnectWallet";
import { WalletRequiredPrompt } from "./components/WalletRequiredPrompt";
import { ToolResponse } from "./components/ToolResponse";
import { XWallet } from "./components/XWallet";
import ReactMarkdown from "react-markdown";
import type { ComponentMessage, Message } from "./hooks/useAgent";
import { AutomateRentTx } from "./components/AutomateRentTransaction";
import { useWalletJotai } from "./atoms/wallet.jotai";
import { PropertyDisplay } from "./components/PropertyDisplay";
import { InvestmentCalculator } from "./components/InvestmentCalculator";
import { useActionFollowUp } from "./hooks/useActionFollowUp";

function isComponentMessage(message: Message): message is ComponentMessage {
  return 'type' in message && message.type === "component";
}

// Type-safe dynamic component renderer
const DynamicComponent: React.FC<ComponentMessage> = (message) => {
  const { component, props } = message;
  console.log(props, message)
  // Directly render specific components with proper typing
  switch (component) {

    case 'WalletRequiredPrompt':
      return <WalletRequiredPrompt 
        onWalletConnected={props.onWalletConnected as any} 
      />;
    case 'ConnectWallet':
      return <ConnectWallet />;

    case 'AutomateRentTx':
        return <AutomateRentTx data={props}/>;
    case 'ToolResponse':
      return <ToolResponse data={props.data || props} />;
    case 'XWallet':
      return <XWallet {...props as any} />;
    case 'PropertyDisplay':
      return <PropertyDisplay {...props as any} />;
    case 'InvestmentCalculator':
      return <InvestmentCalculator {...props as any} />;
    default:
      return <div>Unknown component: {component}</div>;
  }
};

export default function Home() {
  const { messages, sendMessage, isThinking, setMessages } = useAgent();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const walletStatus = useWalletJotai();

  // Add the useActionFollowUp hook to handle follow-up messages from components
  useActionFollowUp((message, source) => {
    if (message) {
      // Add a small delay to let the component fully render first
      setTimeout(() => {
        // Add the follow-up message directly as an agent message
        const followUpMessage: Message = {
          text: message,
          sender: "agent"
        };
        setMessages(prev => [...prev, followUpMessage]);
      }, 800);
    }
  });

  // State for client-side rendering detection

  const [isClient, setIsClient] = useState(false);
  const { isConnected, account: address } = useMetaMask();
  const {walletAddress, isConnected: xWalletConnect} = useWalletJotai()

  // Set client-side rendering flag on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const onSendMessage = async () => {
    if (!input.trim() || isThinking) return;
    const message = input;
    setInput("");
    await sendMessage(message);
  };

  const renderMessage = (message: Message) => {
    if (isComponentMessage(message)) {
      return <DynamicComponent {...message} />;
    }
    
    if ('text' in message) {
      return (
        <div className="prose dark:prose-invert">
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </div>
      );
    }
    
    return null;
  };

  // Format wallet address for display
  const formatAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Wallet status section - only render on client
  const renderWalletStatus = () => {
    if (!isClient) {
      return (
        <div className="w-full max-w-2xl bg-gray-100 dark:bg-gray-700 p-2 rounded-t-lg flex justify-between items-center">
          <div className="text-sm">
            <span className="text-gray-500 dark:text-gray-300">RWA Agent</span>
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <span className="mr-2">Loading wallet...</span>
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="relative z-10">
              {/* Placeholder for wallet button during SSR */}
              <button disabled className="px-4 py-1 text-sm bg-gray-300 dark:bg-gray-600 rounded-lg text-gray-500">
                Connect
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full max-w-2xl bg-gray-100 dark:bg-gray-700 p-2 rounded-t-lg flex justify-between items-center">
        <div className="text-sm">
          <span className="text-gray-500 dark:text-gray-300">RWA Agent</span>
        </div>
        <div>
          {xWalletConnect && walletAddress ? (
            <div className="flex items-center space-x-3">
              <div className="text-xs text-gray-600 dark:text-gray-300">
                {formatAddress(walletAddress)}
              </div>
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                <span className="text-xs text-gray-600 dark:text-gray-300">Connected</span>
              </div>
            </div>
          ) :isConnected && address ? (
            <div className="flex items-center space-x-3">
              <div className="text-xs text-gray-600 dark:text-gray-300">
                {formatAddress(address)}
              </div>
              <div className="flex items-center">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                <span className="text-xs text-gray-600 dark:text-gray-300">Connected</span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              <span className="mr-2">Wallet not connected</span>
            </div>
          )}
        </div>
        {/* Wallet component */}
        <div className="flex-shrink-0">
          <div className="relative z-10">
            <ConnectWallet />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-grow items-center justify-center text-black dark:text-white w-full h-full">
      {/* Wallet info bar with client-side rendering protection */}
      {renderWalletStatus()}

      <div className="w-full max-w-2xl h-[70vh] bg-white dark:bg-gray-800 shadow-lg rounded-b-lg p-4 flex flex-col">
        {/* Messages container */}
        <div className="flex-grow overflow-y-auto mb-4 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message.sender === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-200 dark:bg-gray-700"
              } p-3 rounded-lg max-w-[80%]`}
            >
              {renderMessage(message)}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input container */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
            placeholder="Type your message..."
            className="flex-grow p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isThinking}
          />
          <button
            onClick={onSendMessage}
            disabled={isThinking}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
