import { createAsyncThunk } from "@reduxjs/toolkit";
import { Api, requestTypes } from "../../utils/RestProxy";

export const getUserList = createAsyncThunk("users/list", async params => {
  const response = await Api({
    method: requestTypes.GET,
    url: "/user",
    params
  });
  // The value we return becomes the `fulfilled` action payload
  return response;
});
