import { useCallback, useEffect } from "react";
import {
  addMessage as addMessageToChat,
  clearMessages,
  fetchChatHistory,
  selectLoading,
  selectMessages,
  sendMessage,
} from "../store/chat.slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { ChatMessage } from "../types/chat.models";
import { useUserId } from "./use-user-id";

export function useChatHistory() {
  const { userId } = useUserId();
  const dispatch = useAppDispatch();
  const storedMessages = useAppSelector(selectMessages);
  const isLoading = useAppSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchChatHistory(userId));
  }, [dispatch, userId]);

  const addMessage = useCallback(
    (message: string) => {
      const chatMesage: ChatMessage = {
        content: message,
        role: "user",
        createdAt: new Date(),
      };
      dispatch(addMessageToChat(chatMesage));
      dispatch(sendMessage({ message, userId }));
    },
    [dispatch, userId]
  );

  const clearHistory = useCallback(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  return { messages: storedMessages, addMessage, clearHistory, isLoading };
}
