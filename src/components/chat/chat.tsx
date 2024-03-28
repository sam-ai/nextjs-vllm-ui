import React from "react";

import { ChatRequestOptions } from "ai";
import { Message } from "ai/react";

import ChatBottombar from "./chat-bottombar";
import ChatList from "./chat-list";
import { ChatOptions } from "./chat-options";
import ChatTopbar from "./chat-topbar";

export interface ChatProps {
  chatId?: string;
  messages: Message[];
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    chatRequestOptions?: ChatRequestOptions
  ) => void;
  isLoading: boolean;
  error: undefined | Error;
  stop: () => void;
}

export interface ChatTopbarProps {
  chatOptions: ChatOptions;
  setChatOptions: React.Dispatch<React.SetStateAction<ChatOptions>>;
}

export default function Chat({
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  error,
  stop,
  chatOptions,
  setChatOptions,
  chatId,
}: ChatProps & ChatTopbarProps) {
  return (
    <div className="flex flex-col justify-between w-full h-full  ">
      <ChatTopbar
        chatOptions={chatOptions}
        setChatOptions={setChatOptions}
        isLoading={isLoading}
        chatId={chatId}
        messages={messages}
      />

      <ChatList
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        stop={stop}
      />

      <ChatBottombar
        selectedModel={chatOptions.selectedModel}
        messages={messages}
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
        stop={stop}
      />
    </div>
  );
}
