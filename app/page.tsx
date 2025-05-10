"use client";

import { useState, useEffect, useRef } from "react";
import { useAgent } from "./hooks/useAgent";
import ReactMarkdown from "react-markdown";
import { getComponent } from "./components/ComponentRegistry";
import type { ComponentMessage, Message } from "./hooks/useAgent";

function isComponentMessage(message: Message): message is ComponentMessage {
  return 'type' in message && message.type === "component";
}

export default function Home() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, isThinking } = useAgent();
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
      const Component = getComponent(message.component);
      if (!Component) {
        return <div>Unknown component: {message.component}</div>;
      }
      return <Component data={null} {...message.props} />;
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

  return (
    <div className="flex flex-col flex-grow items-center justify-center text-black dark:text-white w-full h-full">
      <div className="w-full max-w-2xl h-[70vh] bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col">
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
