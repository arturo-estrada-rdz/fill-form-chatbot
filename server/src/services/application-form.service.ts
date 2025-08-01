import { getUserData, updateUserData, userExists } from '../data/data-store';
import { ApplicationFormData } from '../types/form-data.models';

export class ApplicationFormService {
  async submitForm(form: ApplicationFormData, userId: string) {
    Object.keys(form).forEach((key) => {
      const field = key as keyof ApplicationFormData;
      updateUserData(userId, field, form[field]!);
    });

    updateUserData(userId, 'status', 'submitted');

    return Promise.resolve(true);
  }

  async saveFormData(form: ApplicationFormData, userId: string): Promise<boolean> {
    Object.keys(form).forEach((key) => {
      const field = key as keyof ApplicationFormData;
      updateUserData(userId, field, form[field]!);
    });

    updateUserData(userId, 'status', 'draft');

    return Promise.resolve(true);
  }

  async getFormData(userId: string) {
    if (!userExists(userId)) {
      console.info(`User id ${userId} not found, crating new record`);
    }

    const formData = getUserData(userId);

    return Promise.resolve(formData);
  }
}

export const applicationFormService = new ApplicationFormService();
