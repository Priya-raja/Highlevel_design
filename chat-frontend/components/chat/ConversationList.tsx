"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { Conversation } from "@/types/conversation";

interface Props {
  selectedConversation: Conversation | null;
  setSelectedConversation: (
    conversation: Conversation
  ) => void;
}

export default function ConversationList({selectedConversation,
  setSelectedConversation,} : Props) 
  {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        if (!user) return;

        const { data } = await api.get(
          `/conversations/user/${user._id}`
        );

        setConversations(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchConversations();
  }, [user]);

  return (
    <div>
      <div className="p-4 border-b">
        <h1 className="font-bold text-xl">Chats</h1>
      </div>

      {conversations.map((conversation) => (
        <div
          key={conversation._id}
          onClick={() => setSelectedConversation(conversation)}
          className={`cursor-pointer border-b p-4 hover:bg-gray-200 dark:hover:bg-gray-700 ${
            selectedConversation?._id === conversation._id
              ? "bg-gray-200 dark:bg-gray-700"
              : ""
          }`}
        >
          {conversation.participants.find(
            (p) => p._id !== user?._id
          )?.username }
        </div>
      ))}
    </div>
  );
}
