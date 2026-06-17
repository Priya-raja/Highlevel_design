"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import ConversationList from "@/components/chat/ConversationList";
import ChatWindow from "@/components/chat/ChatWindow";
import { Conversation } from "@/types/conversation";

export default function ChatPage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const [hydrated, setHydrated] = useState(false);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;

    if (!user || !token) {
      router.push("/login");
    }
  }, [hydrated, user, token, router]);

  if (!hydrated) {
    return <div>Loading...</div>;
  }

  if (!user || !token) {
    return null;
  }

  return (
    <div className="h-screen flex">
      <aside className="w-80 border-r">
        <ConversationList
          selectedConversation={selectedConversation}
          setSelectedConversation={setSelectedConversation}
        />
      </aside>

      <main className="flex-1">
        <ChatWindow conversation={selectedConversation} />
      </main>
    </div>
  );
}