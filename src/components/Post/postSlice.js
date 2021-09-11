import { createSlice } from "@reduxjs/toolkit";
import { getPostsByUser, getPostsByTag, getCommentsForPost } from "./postAPI";
import { POSTS_PER_PAGE } from "../../pages/Posts/constants";

const initialState = {
  posts: [],
  status: "idle",
  commentsStatus: "idle",
  totalPages: 0,
  totalComments: 0,
  comments: {}
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getPostsByUser.pending, state => {
        state.status = "loading";
      })
      .addCase(getPostsByUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.posts = action.payload.data;
        state.totalPages = Math.ceil(action.payload.total / POSTS_PER_PAGE);
      })
      .addCase(getPostsByTag.pending, state => {
        state.status = "loading";
      })
      .addCase(getPostsByTag.fulfilled, (state, action) => {
        state.status = "idle";
        state.posts = action.payload.data;
        state.totalPages = Math.ceil(action.payload.total / POSTS_PER_PAGE);
      })
      .addCase(getCommentsForPost.pending, (state, action) => {
        state.comments[action.meta.arg.postId] = { status: "loading" };
      })
      .addCase(getCommentsForPost.fulfilled, (state, action) => {
        state.comments[action.payload.postId] = {
          data: action.payload.data,
          status: action.payload.status,
          totalComments: Math.ceil(action.payload.total / POSTS_PER_PAGE)
        };
      });
  }
});

export default postSlice.reducer;
