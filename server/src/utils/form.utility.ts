import { ApplicationFormData } from '../types/form-data.models';

export const formSteps: (keyof ApplicationFormData)[] = [
  'fullName',
  'dateOfBirth',
  'passportNumber',
  'nationality',
  'purposeOfVisit',
  'durationOfStay',
  'contactInfo',
];

export const fieldPrompts: Record<keyof Omit<ApplicationFormData, 'status'>, string> = {
  fullName: "What's your full name?",
  dateOfBirth: "What's your date of birth?",
  passportNumber: 'Please enter your passport number.',
  nationality: 'What is your nationality?',
  purposeOfVisit: 'What is the purpose of your visit?',
  durationOfStay: 'How long will you stay?',
  contactInfo: 'Can you provide your contact email or phone?',
};
