import { api } from "@/lib/api";
import { Conversation } from "@/types/conversation";

export const createOrGetDirectConversation = async (
  participantIds: string[]
) => {
  const { data } = await api.post<Conversation>(
    "/conversations/direct",
    {
      participantIds,
    }
  );

  return data;
};