import {create} from "zustand";
import {Conversation} from "@/types/conversation";

interface ConversationState {
  selectedConversation: Conversation | null;
  setSelectedConversation: (conversation: Conversation | null) => void;
}

export const useConversationStore = create<ConversationState>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) =>
    set({ selectedConversation: conversation }),

}));