import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store.models";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: undefined as string | undefined,
  },
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { setUserId } = userSlice.actions;
export const selectUserId = (state: RootState) => state.user.userId;

export default userSlice.reducer;
