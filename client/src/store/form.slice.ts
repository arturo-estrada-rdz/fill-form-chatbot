import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { applicationService } from "../services/application-form.service";
import { FormThunkParams } from "../types/form.models";
import { ApplicationFormState, RootState } from "./store.models";

const initialState: ApplicationFormState = {
  applicationForm: {
    fullName: "",
    dateOfBirth: "",
    passportNumber: "",
    nationality: "",
    purposeOfVisit: "",
    durationOfStay: "",
    contactInfo: "",
  },
  loading: false,
  errors: null,
};

export const fetchFormData = createAsyncThunk(
  "form/fetchFormData",
  async (userId: string) => {
    const formData = await applicationService.fetchApplicationFormData(userId);
    return formData;
  }
);

export const saveFormData = createAsyncThunk(
  "form/saveFormData",
  async ({ userId, form }: FormThunkParams) => {
    const result = await applicationService.saveApllicationForm(userId, form);
    return result;
  }
);

export const submitFormData = createAsyncThunk(
  "form/submitFormData",
  async ({ userId, form }: FormThunkParams) => {
    const result = await applicationService.submitApplicationForm(userId, form);
    return result;
  }
);

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setApplicationForm: (state, action) => {
      state.applicationForm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFormData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFormData.fulfilled, (state, action) => {
      state.loading = false;
      state.errors = null;
      state.applicationForm = { ...state.applicationForm, ...action.payload };
    });
    builder.addCase(fetchFormData.rejected, (state, action) => {
      state.loading = false;
      state.errors = { [action.type]: action.error };
    });
    builder.addCase(saveFormData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(saveFormData.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(saveFormData.rejected, (state, action) => {
      state.loading = false;
      state.errors = { [action.type]: action.error };
    });
    builder.addCase(submitFormData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(submitFormData.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(submitFormData.rejected, (state, action) => {
      state.loading = false;
      state.errors = { [action.type]: action.error };
    });
  },
});

export const { setApplicationForm } = formSlice.actions;

export const selectApplicationForm = (state: RootState) =>
  state.form.applicationForm;
export const selectFormIsLoading = (state: RootState) => state.form.loading;

export default formSlice.reducer;
