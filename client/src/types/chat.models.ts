export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  content: string;
  role: ChatRole;
  createdAt: Date;
}

export interface ChatReply {
  reply: string;
}
