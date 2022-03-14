import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";

import React from "react";
import FormGiftAid from "../FormGiftAid";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom";
import { HelmetProvider } from "react-helmet-async";
global.scrollTo = jest.fn();
afterAll(() => {
  jest.clearAllMocks();
});
afterEach(cleanup);

describe("GiftAid Form Test", () => {
  test("should show correct number of fields initially", async () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <HelmetProvider>
        <Router location={history.location} navigator={history}>
          <FormGiftAid />
        </Router>
      </HelmetProvider>
    );

    const formTextBoxes = screen.getAllByRole("textbox");
    const formCheckBoxes = screen.getAllByRole("checkbox");
    const submitButton = screen.getByRole("button", { name: /submit form/i });
    expect(formTextBoxes.length).toEqual(5);
    expect(formCheckBoxes.length).toBe(2);
    expect(submitButton).toBeInTheDocument();
  });

  test("should correctly show and remove error message for gift aid", async () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <HelmetProvider>
        <Router location={history.location} navigator={history}>
          <FormGiftAid />
        </Router>
      </HelmetProvider>
    );
    let errorMessage = screen.queryByText(/please fill in all fields/i);
    expect(errorMessage).not.toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: /submit form/i }));
    errorMessage = screen.getByText(/please fill in all fields/i);
    expect(errorMessage).toBeInTheDocument();

    const name = screen.getByRole("textbox", { name: /name/i });
    const address = screen.getByRole("textbox", { name: /address/i });
    const postcode = screen.getByRole("textbox", { name: /postcode/i });
    const phone = screen.getByRole("textbox", { name: /phone/i });
    const mobile = screen.getByRole("textbox", { name: /mobile/i });

    userEvent.type(name, "name");
    userEvent.type(address, "value");
    userEvent.type(postcode, "value");
    userEvent.type(phone, "value");
    userEvent.type(mobile, "value");

    userEvent.click(screen.getByRole("button", { name: /submit form/i }));

    errorMessage = screen.queryByText(/please fill in all fields/i);

    expect(errorMessage).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/thank you/i)).toBeInTheDocument();
    });
  });
});
