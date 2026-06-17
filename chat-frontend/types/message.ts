export interface Message {
  _id: string;
  conversationId: string;
  content: string;
  createdAt: string;

  senderId: {
    _id: string;
    username: string;
  };
}