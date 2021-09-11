import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api, requestTypes } from "../../utils/RestProxy";

export const getPostsByUser = createAsyncThunk(
  "posts/by-user",
  async params => {
    const response = await Api({
      method: requestTypes.GET,
      url: `/user/${params.userId}/post`,
      params: { page: params.page - 1, limit: params.limit }
    });
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getPostsByTag = createAsyncThunk("posts/by-tag", async params => {
  const response = await Api({
    method: requestTypes.GET,
    url: `/tag/${params.tagId}/post`,
    params: { page: params.page - 1, limit: params.limit }
  });
  // The value we return becomes the `fulfilled` action payload
  return response;
});

export const getCommentsForPost = createAsyncThunk(
  "posts/comments",
  async params => {
    const response = await Api({
      method: requestTypes.GET,
      url: `/post/${params.postId}/comment`,
      params: { page: 0, limit: 2 }
    });
    response.postId = params.postId;
    return response;
  }
);
