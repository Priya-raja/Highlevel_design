"use client";

import { useEffect, useState, useRef } from "react";
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
  const bottomRef = useRef<HTMLDivElement | null>(null);
  

  useEffect(() => {
    if (!conversation) return;

    const fetchMessages = async () => {
    try {
      const { data } = await api.get(
        `/messages/${conversation?._id}`
      );

      const messagesData = data.messages || data;

      setMessages(messagesData.reverse());

    } catch (error) {
      console.error(error);
    }
  };
fetchMessages()
  }, [conversation]);

  useEffect(() =>{
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async (content: string) => {
    try {
      if (!conversation) return;

    const { data } = await api.post("/messages", {
      conversationId: conversation?._id,
      senderId: CURRENT_USER_ID,
      content,
    });

    setMessages((prev) => [...prev, data]);

  } catch (error) { 
     console.error("Failed to send message", error);
  }

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
        {messages.map((message) => {

           const isMine = message.senderId._id === CURRENT_USER_ID;
           return (
          <div
            key={message._id}
            className= {`mb-3 flex ${
              isMine ? "justify-end" : "justify-start"
              }`}
          >
            <div 
              className={`max-w-xs rounded-lg px-3 py-2 ${
          isMine
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-black"
           }`}
            >
              <p className="text-xs opacity-80">
               {message.senderId.username}
             </p>
            

            
              <p> {message.content} </p>
            </div>
          </div>
        );
       })}
       <div ref={bottomRef}></div>

      </div>

      <MessageInput
       
        onSend={sendMessage}
      />
    </div>
  );

}
