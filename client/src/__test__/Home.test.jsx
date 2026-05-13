import { render } from "@testing-library/react";
import Home from "../Comp/Home";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Features/usersSlice";
import { test, expect } from "vitest";

const store = configureStore({
  reducer: { users: usersReducer },
});

test("Home renders", () => {
  const { getByRole } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  );

  expect(getByRole("heading", { name: /explore oman reviews/i })).toBeInTheDocument();
});