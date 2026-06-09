"use client";

import { useState } from "react";
import ConversationList from "@/components/chat/ConversationList";
import ChatWindow from "@/components/chat/ChatWindow";
import { Conversation } from "@/types/conversation";

export default function ChatPage() {
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  return (
    <div className="h-screen flex">
      <aside className="w-80 border-r">
        <ConversationList
          selectedConversation={selectedConversation}
          setSelectedConversation={
            setSelectedConversation
          }
        />
      </aside>

      <main className="flex-1">
        <ChatWindow
          conversation={selectedConversation}
        />
      </main>
    </div>
  );
}