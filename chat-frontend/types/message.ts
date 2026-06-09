export interface Message {
  _id: string;
  content: string;
  createdAt: string;

  senderId: {
    _id: string;
    username: string;
  };
}