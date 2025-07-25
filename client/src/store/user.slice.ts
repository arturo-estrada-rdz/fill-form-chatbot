import { createSlice } from "@reduxjs/toolkit";
import { RootState, UserStoreState } from "./store.models";

const initialState: UserStoreState = {
  userId: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = userSlice.actions;
export const selectUserId = (state: RootState) => state.user.userId;

export default userSlice.reducer;
