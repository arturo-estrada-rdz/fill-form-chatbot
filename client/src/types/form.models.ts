export interface ApplicationForm {
  fullName: string;
  dateOfBirth: string;
  passportNumber: string;
  nationality: string;
  purposeOfVisit: string;
  durationOfStay: string;
  contactInfo: string;
}

export interface FormSaveResponse {
  result: boolean;
}

export type FormThunkParams = {
  userId: string;
  form: ApplicationForm;
};
