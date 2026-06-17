"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { User } from "@/types/user";
import { getUsers } from "@/services/user.service";
import { Conversation } from "@/types/conversation";
import { createOrGetDirectConversation } from "@/services/conversation.service";

interface Props {
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation) => void;
}

export default function ConversationList({
  selectedConversation,
  setSelectedConversation,
}: Props) {
  const [users, setUsers] = useState<User[]>([]);

  const currentUser = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (!currentUser || !token) return;

        const users = await getUsers(token);
        setUsers(users);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, [currentUser, token]);

  const handleUserClick = async (selectedUser: User) => {
    if (!currentUser) return;

    const conversation = await createOrGetDirectConversation([
      currentUser._id,
      selectedUser._id,
    ]);

    setSelectedConversation(conversation);
  };

  return (
    <div>
      <div className="p-4 border-b">
        <h1 className="font-bold text-xl">Users</h1>
      </div>

      {users.map((user) => (
        <div
          key={user._id}
          onClick={() => handleUserClick(user)}
          className="cursor-pointer border-b p-4 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {user.username}
        </div>
      ))}
    </div>
  );
}