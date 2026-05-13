import { test, expect } from "vitest";
import usersReducer, { logout } from "../Features/usersSlice";

test("logout snapshot", () => {
  const initialState = {
    user: { name: "Salma" },
    isSuccess: false,
    isError: false,
  };

  const newState = usersReducer(initialState, logout());

  expect(newState).toMatchSnapshot();
});