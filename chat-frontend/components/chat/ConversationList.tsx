"use client";

import { useEffect, useState } from "react";
import { createOrGetDirectConversation } from "@/services/conversation.service";
import { getUsers } from "@/services/user.service";
import { useAuthStore } from "@/stores/auth.store";
import { Conversation } from "@/types/conversation";
import { User } from "@/types/user";

interface Props {
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation | null) => void;
}

export default function ConversationList({
  selectedConversation,
  setSelectedConversation,
}: Props) {
  const currentUser = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        setError("");
        setIsLoading(true);
        const fetchedUsers = await getUsers(token);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Failed to load users", error);
        setError("Unable to load users");
      } finally {
        setIsLoading(false);
      }
    };

    loadUsers();
  }, [token]);

  const handleUserClick = async (user: User) => {
    if (!currentUser) return;

    try {
      setError("");
      const conversation = await createOrGetDirectConversation([
        currentUser._id,
        user._id,
      ]);
      setSelectedConversation(conversation);
    } catch (error) {
      console.error("Failed to open conversation", error);
      setError("Unable to open conversation");
    }
  };

  return (
    <div className="flex h-full flex-col bg-white text-zinc-950">
      <div className="border-b border-zinc-200 p-4">
        <h2 className="font-semibold">Users</h2>
      </div>

      {error && <p className="px-4 py-3 text-sm text-red-600">{error}</p>}

      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <p className="px-4 py-3 text-sm text-zinc-500">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="px-4 py-3 text-sm text-zinc-500">
            No other users found.
          </p>
        ) : (
          users.map((user) => {
            const isSelected =
              selectedConversation?.participants.includes(user._id) ?? false;

            return (
              <button
                key={user._id}
                type="button"
                onClick={() => handleUserClick(user)}
                className={`block w-full border-b border-zinc-100 px-4 py-3 text-left transition hover:bg-zinc-50 ${
                  isSelected ? "bg-zinc-100" : "bg-white"
                }`}
              >
                <p className="font-medium text-zinc-950">{user.username}</p>
                <p className="text-sm text-zinc-500">{user.email}</p>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
