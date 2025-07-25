import { ThunkAction } from "@reduxjs/toolkit";
import { ChatMessage } from "../types/chat.models";
import { ApplicationForm } from "../types/form.models";
import store from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, any>;

export interface UserStoreState {
  userId: string;
}

export interface ChatStoreState {
  messages: ChatMessage[];
  errors: {
    fetchChatHistory: string | undefined;
    sendMessage: string | undefined;
  };
  loading: boolean;
}

export interface ApplicationFormState {
  applicationForm: ApplicationForm;
  loading: boolean;
  errors: Record<string, unknown> | null;
}
