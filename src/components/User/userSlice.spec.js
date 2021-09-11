import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
// We're using our own custom render function and not RTL's render.
// Our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from "../../utils/test-utils";
import App from "../../App";
import { WELCOME_MESSAGE } from "../../pages/Home/constants";
import { POSTS, USERS } from "../../test/testData";

// We use msw to intercept the network request during the test,
export const handlers = [
  rest.get("https://dummyapi.io/data/v1/user", (req, res, ctx) => {
    return res(ctx.json(USERS), ctx.delay(0));
  }),
  rest.get("https://dummyapi.io/data/v1/user/*/post", (req, res, ctx) => {
    return res(ctx.json(POSTS), ctx.delay(0));
  })
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => {
  jest.useRealTimers();
  jest.setTimeout(50000);
  server.listen();
});

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());
test("Checks that users and posts are loading correctly", async () => {
  render(<App />);

  expect(screen.getByText(WELCOME_MESSAGE)).toBeInTheDocument();

  await screen.findAllByAltText(/mr. /i);
  screen.debug();
  fireEvent.click(
    await screen.getAllByRole("button", {
      name: /Get Posts/i
    })[0]
  );
  expect(await screen.findByText("adult Labrador retriever"));
});
