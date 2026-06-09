"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Conversation } from "@/types/conversation";
import { Message } from "@/types/message";
import MessageInput from "./MessageInput";

interface Props {
  conversation: Conversation | null;
}

const CURRENT_USER_ID = "6a246cdd03c488976ac9470f";

export default function ChatWindow({conversation,}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  

  

  useEffect(() => {
    if (!conversation) return;

    const fetchMessages = async () => {
    try {
      const { data } = await api.get(
        `/messages/${conversation?._id}`
      );

      setMessages(data.messages || data);
    } catch (error) {
      console.error(error);
    }
  };
fetchMessages()
  }, [conversation]);

  const handleSendMessage = async (content: string) => {
    if (!conversation) return;

    const { data } = await api.post("/messages", {
      conversationId: conversation._id,
      senderId: CURRENT_USER_ID,
      content,
    });

    setMessages((currentMessages) => [data, ...currentMessages]);
  };

  
  if (!conversation){
  return (
      <div className="h-full flex items-center justify-center">
        Select a conversation
      </div>
    );
  }
return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4">
        <h2 className="font-bold">
          Messages
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className="mb-4"
          >
            <div className="font-semibold text-sm">
              {message.senderId.username}
            </div>

            <div>
              {message.content}
            </div>
          </div>
        ))}
      </div>

      <MessageInput
        disabled={!conversation}
        onSend={handleSendMessage}
      />
    </div>
  );

}
