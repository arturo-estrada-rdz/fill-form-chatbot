export type FormStatus = 'draft' | 'submitted';

export interface ApplicationFormData {
  fullName?: string;
  dateOfBirth?: string;
  passportNumber?: string;
  nationality?: string;
  purposeOfVisit?: string;
  durationOfStay?: string;
  contactInfo?: string;
  status?: FormStatus;
}
