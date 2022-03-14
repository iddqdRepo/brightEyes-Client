import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Donate from "../Donate";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom";
import axios from "axios";
import { HelmetProvider } from "react-helmet-async";

global.scrollTo = jest.fn();
afterAll(() => {
  jest.clearAllMocks();
});
describe("Home Component Tests", () => {
  test("should contain paypal donate button", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <HelmetProvider>
        <Router location={history.location} navigator={history}>
          <Donate />
        </Router>
      </HelmetProvider>
    );
    const donateButton = screen.getByRole("button", { name: /donate with paypal button/i });
    expect(donateButton).toBeInTheDocument();
  });
});
