"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ConversationList from "@/components/chat/ConversationList";
import ChatWindow from "@/components/chat/ChatWindow";
import { useAuthStore } from "@/stores/auth.store";
import { Conversation } from "@/types/conversation";

export default function ChatPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  useEffect(() => {
    if (!user || !token) {
      router.push("/login");
    }
  }, [router, token, user]);

  if (!user || !token) {
    return null;
  }

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
