import { ApplicationFormData } from '../types/form-data.models';

const userDataStore: Record<string, ApplicationFormData> = {};

export const getUserData = (userId: string): ApplicationFormData => {
  if (!userDataStore[userId]) {
    userDataStore[userId] = {}; // start fresh
  }
  return userDataStore[userId];
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
