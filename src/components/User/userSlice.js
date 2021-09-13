import { createSlice } from "@reduxjs/toolkit";
import { getUserList } from "./userAPI";
import { USERS_PER_PAGE } from "../../pages/Users/constants";

const initialState = {
  users: [],
  status: "idle",
  totalPages: 0
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getUserList.pending, state => {
        state.status = "loading";
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload.data;
        state.totalPages = Math.ceil(action.payload.total / USERS_PER_PAGE);
      })
      .addCase(getUserList.rejected, state => {
        state.status = "error";
      });
  }
});

export default userSlice.reducer;
