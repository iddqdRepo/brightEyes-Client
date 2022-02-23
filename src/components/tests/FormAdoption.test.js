import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import FormAdoption from "../FormAdoption";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";

describe("Adoption Form Test", () => {
  test("About You fieldset form fields are working as intended", async () => {
    render(
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
    );
    const title = screen.getByRole("textbox", {
      name: /title/i,
    });
    userEvent.type(title, "Mr");

    expect(title.value).toBe("Mr");
    // screen.debug();
  });
});
