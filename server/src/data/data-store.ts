import { ChatMessage } from '../types/chatbot.models';
import { ApplicationFormData } from '../types/form-data.models';

const userDataStore: Record<string, ApplicationFormData> = {};
const messageDataStore: Record<string, ChatMessage[]> = {};

export const getUserData = (userId: string): ApplicationFormData => {
  if (!userExists(userId)) {
    userDataStore[userId] = {}; // start fresh
  }
  return userDataStore[userId];
};

export const userExists = (userId: string): boolean => {
  return !!userDataStore[userId];
};

export const updateUserData = (
  userId: string,
  field: keyof ApplicationFormData,
  value: string
): void => {
  if (!userDataStore[userId]) {
    userDataStore[userId] = {};
  }
  userDataStore[userId][field] = value;
};

export const clearUserData = (userId: string): void => {
  delete userDataStore[userId];
};

export const saveMessage = (userId: string, message: ChatMessage): void => {
  if (!messageDataStore[userId]) {
    messageDataStore[userId] = [];
  }
  messageDataStore[userId].push(message);
};

export const getChatHistory = (userId: string): ChatMessage[] => {
  return messageDataStore[userId] || [];
};

export const clearChatHistory = (userId: string): void => {
  delete messageDataStore[userId];
};
