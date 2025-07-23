import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store.models";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    applicationForm: {
      fullName: "",
      dateOfBirth: "",
      passportNumber: "",
      nationality: "",
      purposeOfVisit: "",
      durationOfStay: "",
      contactInfo: "",
    },
  },
  reducers: {
    setApplicationForm: (state, action) => {
      state.applicationForm = action.payload;
    },
  },
});

export const { setApplicationForm } = formSlice.actions;
export const selectApplicationForm = (state: RootState) =>
  state.form.applicationForm;

export default formSlice.reducer;
