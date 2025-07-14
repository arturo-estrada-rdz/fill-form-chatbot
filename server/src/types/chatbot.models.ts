export type ChatRoles = 'user' | 'system' | 'assistant';

export interface ChatMessage {
  role: ChatRoles;
  content: string;
}
