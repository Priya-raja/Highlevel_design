import { Message } from "./message";
import { User } from "./user";

export interface Conversation{
    _id: string;
    participants: string[];
    isGroup: boolean;
    groupName?: string;
    lastMessage?: Message;
    updatedAt: string;
}
