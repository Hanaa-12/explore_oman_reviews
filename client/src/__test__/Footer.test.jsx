import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../Comp/Footer";
import { test, expect } from "vitest";

test("Footer renders links", () => {
  const { getByText } = render(
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
  );

  expect(getByText("About")).toBeInTheDocument();
  expect(getByText("Contact")).toBeInTheDocument();
  expect(getByText("Privacy")).toBeInTheDocument();
});