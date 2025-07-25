import { apiClient } from "../config/api-client";
import { ApplicationForm, FormSaveResponse } from "../types/form.models";

export class ApplicationFormService {
  private baseUrl = "/form";

  async fetchApplicationFormData(
    userId: string
  ): Promise<Partial<ApplicationForm>> {
    try {
      const response = await apiClient.get<Partial<ApplicationForm>>(
        `${this.baseUrl}/${userId}`
      );
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Unable to retrieve form data", error);
      throw error;
    }
  }

  async submitApplicationForm(
    userId: string,
    form: ApplicationForm
  ): Promise<FormSaveResponse> {
    try {
      const response = await apiClient.post<FormSaveResponse>(this.baseUrl, {
        userId,
        form,
      });
      const result = response.data;
      return result;
    } catch (error) {
      console.error("Unable to submit form", error);
      throw error;
    }
  }

  async saveApllicationForm(
    userId: string,
    form: ApplicationForm
  ): Promise<FormSaveResponse> {
    const response = await apiClient.post<FormSaveResponse>(
      `${this.baseUrl}/draft`,
      {
        userId,
        form,
      }
    );
    const result = response.data;
    return result;
  }
}

export const applicationService = new ApplicationFormService();
