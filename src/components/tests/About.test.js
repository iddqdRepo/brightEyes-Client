import { fireEvent, getByRole, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import About from "../About";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom";

describe("About Component Tests", () => {
  test("should redirect to donate page when donate button is clicked", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <Router location={history.location} navigator={history}>
        <About />
      </Router>
    );

    const donateButton = screen.getByRole("button", {
      name: /Donate/i,
    });
    expect(history.location.pathname).toBe("/");
    userEvent.click(donateButton);
    expect(history.location.pathname).toBe("/donate");
  });
});
