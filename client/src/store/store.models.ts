import { ThunkAction } from "@reduxjs/toolkit";
import { ChatMessage } from "../types/chat.models";
import store from "./store";

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, any>;

export interface UserStore {
  userId: string;
}

export interface ChatStore {
  messages: ChatMessage[];
}
