"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
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

  const currentUserId = "6a246cdd03c488976ac9470f"
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const userId = "6a246cdd03c488976ac9470f";

        const { data } = await api.get(
          `/conversations/user/${userId}`
        );

        setConversations(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchConversations();
  }, []);

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
            (p) => p._id !== currentUserId
          )?.username }
        </div>
      ))}
    </div>
  );
}
