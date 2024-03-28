"use client";

import React from "react";

import { PaperPlaneIcon, StopIcon } from "@radix-ui/react-icons";
import TextareaAutosize from "react-textarea-autosize";

import { Button } from "../ui/button";
import { ChatProps } from "./chat";

interface ChatBottombarProps extends ChatProps {
  selectedModel: string | undefined;
}

export default function ChatBottombar({
  selectedModel,
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  error,
  stop,
}: ChatBottombarProps) {
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const hasSelectedModel = selectedModel && selectedModel !== "";

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && hasSelectedModel && !isLoading) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  return (
    <div className="p-4 flex justify-between w-full items-center gap-2">
      <div key="input" className="w-full relative mb-2 items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full items-center flex relative gap-2"
        >
          <TextareaAutosize
            autoComplete="off"
            value={input}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Ask vLLM anything..."
            className="border-input max-h-20 px-5 py-4 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full border rounded-md flex items-center h-14 resize-none overflow-hidden dark:bg-card/35"
          />
          {!isLoading ? (
            <Button
              className="shrink-0"
              variant="secondary"
              size="icon"
              type="submit"
              disabled={isLoading || !input.trim() || !hasSelectedModel}
            >
              <PaperPlaneIcon className=" w-6 h-6 text-muted-foreground" />
            </Button>
          ) : (
            <Button
              className="shrink-0"
              variant="secondary"
              size="icon"
              onClick={stop}
            >
              <StopIcon className="w-6 h-6  text-muted-foreground" />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
