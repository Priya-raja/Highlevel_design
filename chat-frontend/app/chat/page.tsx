"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { socket } from "@/lib/socket";
import { useAuthStore } from "@/stores/auth.store";
import { useConversationStore } from "@/stores/conversation.store";
import ConversationList from "@/components/chat/ConversationList";
import ChatWindow from "@/components/chat/ChatWindow";

export default function ChatPage() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  const selectedConversation = useConversationStore(
    (state) => state.selectedConversation
  );

  const setSelectedConversation = useConversationStore(
    (state) => state.setSelectedConversation
  );

  useEffect(() => {
    if (!user) return;
    socket.connect();

    socket.on("connect", () => {
      console.log("Connected:", socket.id);
      socket.emit("join-user", user._id);
    });

    return () => {
      socket.off("connect");
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!user || !token) {
      router.push("/login");
    }
  }, [hasHydrated, user, token, router]);

  if (!hasHydrated) {
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