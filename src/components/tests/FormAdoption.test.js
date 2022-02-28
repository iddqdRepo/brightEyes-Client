import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import FormAdoption from "../FormAdoption";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { HelmetProvider } from "react-helmet-async";

describe("Adoption Form Test", () => {
  test("About You fieldset form fields are working as intended", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter
          initialEntries={[
            {
              pathname: "/forms/adoption",
              state: {
                detail: "Cat",
              },
            },
          ]}
        >
          <FormAdoption />
        </MemoryRouter>
      </HelmetProvider>
    );
    const title = screen.getByRole("textbox", {
      name: /title/i,
    });
    userEvent.type(title, "Mr");

    expect(title.value).toBe("Mr");
    // screen.debug();
  });

  test("form fields", async () => {
    render(
      <HelmetProvider>
        <MemoryRouter
          initialEntries={[
            {
              pathname: "/forms/adoption",
              state: {
                detail: "Cat",
              },
            },
          ]}
        >
          <FormAdoption />
        </MemoryRouter>
      </HelmetProvider>
    );
    const formTextBoxes = screen.getAllByRole("textbox");
    const formComboBoxes = screen.getAllByRole("combobox");
    const formTextBoxIds = formTextBoxes.map((el) => {
      return el.id;
    });
    const formComboBoxIds = formComboBoxes.map((el) => {
      return el.id;
    });

    console.log(formTextBoxIds);
    console.log(formComboBoxIds);
    // userEvent.type(title, "Mr");

    // expect(title.value).toBe("Mr");
    // screen.debug();
  });
});
