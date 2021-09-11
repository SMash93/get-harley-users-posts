import { createSlice } from "@reduxjs/toolkit";
import { getUserList } from "./userAPI";

const initialState = {
  users: [],
  status: "idle",
  totalPosts: 0
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
        state.totalPosts = action.payload.total;
      });
  }
});

export default userSlice.reducer;
