import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import Login from "../client_register/Login";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../Features/usersSlice";

const store = configureStore({
  reducer: { users: usersReducer },
});

test("Login renders", () => {
  const { getAllByText } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    </Provider>
  );

 const elements = getAllByText(/login/i);
expect(elements.length).toBeGreaterThan(0);
});