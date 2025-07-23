import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatbotService } from "../services/chatbot.service";
import { ChatRole } from "../types/chat.models";
import { RootState } from "./store.models";

export const fetchChatHistory = createAsyncThunk(
  "chat/fetchChatHistory",
  async (userId: string) => {
    const chats = await chatbotService.fetchChatHistory(userId);
    return chats;
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ message, userId }: { message: string; userId: string }) => {
    const chatMessage = await chatbotService.sendMessage(message, userId);
    return chatMessage;
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [
      {
        content:
          "Hi! How can I dramatically overestimate my usefulness for you today?",
        role: "assistant" as ChatRole,
        createdAt: new Date(),
      },
    ],
    errors: {
      fetchChatHistory: undefined as string | undefined,
      sendMessage: undefined as string | undefined,
    },
    loading: false,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatHistory.pending, (state) => {
      state.loading = true;
      state.errors.fetchChatHistory = undefined;
    });
    builder.addCase(fetchChatHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.messages = [state.messages[0], ...action.payload];
    });
    builder.addCase(fetchChatHistory.rejected, (state, action) => {
      console.error("Failed to fetch chat history:", action.error);
      state.loading = false;
      state.errors.fetchChatHistory = action.error.message;
    });
    builder.addCase(sendMessage.pending, (state) => {
      state.loading = true;
      state.errors.sendMessage = undefined;
    });
    builder.addCase(sendMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.errors.sendMessage = undefined;
      state.messages.push(action.payload);
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      console.error("Failed to send message:", action.error);
      state.loading = false;
      state.errors.sendMessage = action.error.message;
    });
  },
});

export const { addMessage, clearMessages } = chatSlice.actions;
export const selectMessages = (state: RootState) => state.chat.messages;
export const selectLoading = (state: RootState) => state.chat.loading;

export default chatSlice.reducer;
