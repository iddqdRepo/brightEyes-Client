import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Router } from "react-router-dom";

import React from "react";
import FormVolunteer from "../FormVolunteer";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom";
import { HelmetProvider } from "react-helmet-async";
global.scrollTo = jest.fn();
afterAll(() => {
  jest.clearAllMocks();
});

afterEach(cleanup);

describe("Volunteer Form Test", () => {
  test("should show correct number of fields initially", async () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <HelmetProvider>
        <Router location={history.location} navigator={history}>
          <FormVolunteer />
        </Router>
      </HelmetProvider>
    );
    const formTextBoxes = screen.getAllByRole("textbox");
    const formComboBoxes = screen.getAllByRole("combobox");
    const formCheckBoxes = screen.getAllByRole("checkbox");
    const submitButton = screen.getByRole("button", { name: /submit form/i });
    expect(formTextBoxes.length).toEqual(25);
    expect(formComboBoxes.length).toEqual(5);
    expect(formCheckBoxes.length).toBe(1);

    expect(submitButton).toBeInTheDocument();
  });

  test("should correctly show and remove error message for gift aid", async () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <HelmetProvider>
        <Router location={history.location} navigator={history}>
          <FormVolunteer />
        </Router>
      </HelmetProvider>
    );
    let errorMessage = screen.queryByText(/please fill in all fields/i);
    expect(errorMessage).not.toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: /submit form/i }));
    errorMessage = screen.getByText(/please fill in all fields/i);
    expect(errorMessage).toBeInTheDocument();

    userEvent.type(screen.getAllByRole("textbox", { name: /title/i })[0], "value");
    userEvent.type(screen.getAllByRole("textbox", { name: /name/i })[0], "value");
    userEvent.type(screen.getAllByRole("textbox", { name: /address/i })[0], "value");
    userEvent.type(screen.getAllByRole("textbox", { name: /postcode/i })[0], "value");
    userEvent.type(screen.getByRole("textbox", { name: /home phone/i }), "value");
    userEvent.type(screen.getByRole("textbox", { name: /work phone/i }), "value");
    userEvent.type(screen.getByRole("textbox", { name: /mobile/i }), "value");
    userEvent.type(screen.getAllByRole("textbox", { name: /email/i })[0], "value");
    userEvent.type(screen.getByRole("textbox", { name: /occupation/i }), "value");
    userEvent.click(screen.getByRole("checkbox", { name: /i am over 16/i }));

    userEvent.click(screen.getByRole("button", { name: /submit form/i }));

    errorMessage = screen.queryByText(/please fill in all fields/i);
    expect(errorMessage).not.toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText(/thank you/i)).toBeInTheDocument();
    });
  });

  test("should reveal all hidden volunteer fields on correct input", async () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <HelmetProvider>
        <Router location={history.location} navigator={history}>
          <FormVolunteer />
        </Router>
      </HelmetProvider>
    );

    userEvent.selectOptions(
      screen.getByRole("combobox", { name: /Do you have any health conditions or special needs that could affect your ability to volunteer\?/i }),
      "Yes"
    );

    userEvent.selectOptions(screen.getByRole("combobox", { name: /Have you any unspent criminal convictions registered against you\?/i }), "Yes");
    const formTextBoxes = screen.getAllByRole("textbox");
    const formComboBoxes = screen.getAllByRole("combobox");
    const formCheckBoxes = screen.getAllByRole("checkbox");
    expect(formTextBoxes.length).toEqual(27);
    expect(formComboBoxes.length).toEqual(5);
    expect(formCheckBoxes.length).toBe(1);
  });
});
