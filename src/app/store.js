import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/User/userSlice";
import postReducer from "../components/Post/postSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer
  }
});
