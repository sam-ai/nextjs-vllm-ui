"use client";

import React, { useEffect, useState } from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Sidebar } from "../sidebar";
import Chat, { ChatProps, ChatTopbarProps } from "./chat";

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
  chatId: string;
}

type MergedProps = ChatLayoutProps & ChatProps & ChatTopbarProps;

export function ChatLayout({
  defaultLayout = [30, 160],
  defaultCollapsed = false,
  navCollapsedSize,
  messages,
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  error,
  stop,
  chatId,
  chatOptions,
  setChatOptions,
}: MergedProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsMobile(window.innerWidth <= 1023);
    };

    // Initial check
    checkScreenWidth();

    // Event listener for screen width changes
    window.addEventListener("resize", checkScreenWidth);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  return (
    <ResizablePanelGroup
      direction="horizontal"
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(
          sizes
        )}`;
      }}
      className="h-screen items-stretch"
    >
      <ResizablePanel
        defaultSize={defaultLayout[0]}
        collapsedSize={navCollapsedSize}
        collapsible={true}
        minSize={isMobile ? 0 : 20}
        maxSize={isMobile ? 0 : 20}
        onCollapse={() => {
          setIsCollapsed(true);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            true
          )}`;
        }}
        onExpand={() => {
          setIsCollapsed(false);
          document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
            false
          )}`;
        }}
        className={cn(
          isCollapsed
            ? "min-w-[50px] md:min-w-[70px] transition-all duration-300 ease-in-out"
            : "hidden md:block"
        )}
      >
        <Sidebar
          isCollapsed={isCollapsed || isMobile}
          messages={messages}
          isMobile={isMobile}
          chatId={chatId}
          chatOptions={chatOptions}
          setChatOptions={setChatOptions}
        />
      </ResizablePanel>
      <ResizableHandle className={cn("hidden md:flex")} withHandle />
      <ResizablePanel className="h-full" defaultSize={defaultLayout[1]}>
        <Chat
          chatId={chatId}
          chatOptions={chatOptions}
          setChatOptions={setChatOptions}
          messages={messages}
          input={input}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
          error={error}
          stop={stop}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
