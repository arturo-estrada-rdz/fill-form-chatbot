import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { selectMessages } from "../store/chat.slice";
import {
  fetchFormData,
  selectApplicationForm,
  selectFormIsLoading,
  submitFormData,
} from "../store/form.slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectUserId } from "../store/user.slice";
import { ApplicationForm } from "../types/form.models";

export function useApplicationForm() {
  const [form, setForm] = useState<ApplicationForm>({
    fullName: "",
    dateOfBirth: "",
    passportNumber: "",
    nationality: "",
    purposeOfVisit: "",
    durationOfStay: "",
    contactInfo: "",
  });

  const dispatch = useAppDispatch();
  const formValues = useAppSelector(selectApplicationForm);
  const isLoading = useAppSelector(selectFormIsLoading);
  const userId = useAppSelector(selectUserId);
  const storedMessages = useAppSelector(selectMessages);

  useEffect(() => {
    dispatch(fetchFormData(userId));
  }, [storedMessages, dispatch, userId]);

  useEffect(() => {
    setForm({ ...form, ...formValues });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(submitFormData({ userId, form }));
  };

  // TODO: run form validation logic

  return { form, setForm, handleChange, handleSubmit, isLoading };
}
