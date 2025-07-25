import { apiClient } from "../config/api-client";
import { ChatMessage } from "../types/chat.models";

export class ChatbotService {
  async sendMessage(message: string, userId: string): Promise<ChatMessage> {
    try {
      const response = await apiClient.post<ChatMessage>(`/chat-bot`, {
        userId,
        message,
      });
      const result = response.data;

      return result;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }

  async fetchChatHistory(userId: string): Promise<ChatMessage[]> {
    try {
      const response = await apiClient.get<ChatMessage[]>(
        `/chat-bot/${userId}`
      );

      const result = response.data;

      return result;
    } catch (error) {
      console.error("Error fetching chat history:", error);
      throw error;
    }
  }
}

export const chatbotService = new ChatbotService();
