import { ChangeEvent, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
  const { register, handleSubmit, formState, setFocus, setValue, getValues } =
    useForm<ApplicationForm>({
      defaultValues: {
        fullName: "",
        dateOfBirth: "",
        passportNumber: "",
        nationality: "",
        purposeOfVisit: "",
        durationOfStay: "",
        contactInfo: "",
      },
    });

  const dispatch = useAppDispatch();
  const formValuesFromChat = useAppSelector(selectApplicationForm);
  const isLoading = useAppSelector(selectFormIsLoading);
  const userId = useAppSelector(selectUserId);
  const storedMessages = useAppSelector(selectMessages);

  useEffect(() => {
    dispatch(fetchFormData(userId));
  }, [storedMessages, dispatch, userId]);

  useEffect(() => {
    setFocus("fullName");
  }, [setFocus, userId]);

  useEffect(() => {
    const keys = Object.keys(formValuesFromChat) as Array<
      keyof ApplicationForm
    >;

    keys.forEach(async (key) => {
      const hasValue = !!formValuesFromChat[key];
      setValue(key, formValuesFromChat[key], {
        shouldDirty: hasValue,
        shouldTouch: hasValue,
        shouldValidate: hasValue,
      });
    });
  }, [formValuesFromChat, setValue]);

  const submitHandler: SubmitHandler<ApplicationForm> = (form) => {
    dispatch(submitFormData({ userId, form }));
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValue(name as keyof ApplicationForm, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return {
    register,
    handleSubmit: handleSubmit(submitHandler),
    changeHandler,
    formErrors: formState.errors,
    dirtyFields: formState.dirtyFields,
    formValues: getValues(),
    formValid: formState.isValid,
    touchedFields: formState.touchedFields,
    isLoading,
  };
}
