export type User = {
  id: number;
  username: string;
  email: string;
  token: string;
  refreshToken: string;
};

export type TUsers = {
  id: number;
  email: string;
  username: string;
};

export interface IMessage {
  type: "chat";
  receiverId: string;
  content: string;
}

export interface IMessageState extends IMessage {
  id: number;
  senderId: number;
}
