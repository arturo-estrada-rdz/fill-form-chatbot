export type ChatRole = "user" | "assistant";

export interface ChatMessage {
  content: string;
  role: ChatRole;
  createdAt: string;
}

export interface ChatReply {
  reply: string;
}
