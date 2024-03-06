import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App.js";
import "@testing-library/jest-dom";

jest.mock("./pages/HomePage", () => () => <div>HomePage Mock</div>);

describe("App Component", () => {
  test("renders the HomePage component at the root path", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("HomePage Mock")).toBeInTheDocument();
  });
});
