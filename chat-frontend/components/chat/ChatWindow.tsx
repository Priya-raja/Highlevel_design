"use client";

import { useEffect, useState, useRef } from "react";
import { api } from "@/lib/api";
import { useAuthStore } from "@/stores/auth.store";
import { Conversation } from "@/types/conversation";
import { Message } from "@/types/message";
import MessageInput from "./MessageInput";

interface Props {
  conversation: Conversation | null;
}

export default function ChatWindow({conversation,}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const user = useAuthStore((state) => state.user);
  

  const fetchMessages = async (conversationId: string) => {
  try {
    const { data } = await api.get(
      `/messages/cursor/${conversationId}`
    );

    setMessages(data.messages.reverse());

  } catch (error) {
    console.error(error);
  }
};


useEffect(() => {
  if (!conversation) return;

  const load = async () => {
    await fetchMessages(conversation._id);
  };

  load();
}, [conversation]);
 

  //For smooth scrolling after entering new message. No need to click on the arrow btn
  useEffect(() =>{
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const sendMessage = async (content: string) => {
    try {
      if (!conversation) return;
      if (!user) return;

    const { data } = await api.post("/messages", {
      conversationId: conversation?._id,
      senderId: user._id,
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
           const isMine = message.senderId._id === user?._id;
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
