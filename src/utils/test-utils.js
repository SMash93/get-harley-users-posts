import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import userReducer from "../components/User/userSlice";
import postReducer from "../components/Post/postSlice";

function render(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: { user: userReducer, post: postReducer },
      preloadedState
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>;
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
// eslint-disable-next-line import/no-extraneous-dependencies
export * from "@testing-library/react";
// override render method
export { render };
