import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chat.slice";
import formReducer from "./form.slice";
import userReducer from "./user.slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    form: formReducer,
    chat: chatReducer,
  },
});

export default store;
