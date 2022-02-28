import { act, render, screen, cleanup, getAllByTestId, getAllByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import AdminAddAnimal from "../AdminComponents/AdminAddAnimal";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import axios from "axios";
import "@testing-library/jest-dom";
import { HelmetProvider } from "react-helmet-async";

describe("Adoption Component Tests", () => {
  test("All form fields should be visible with no image chosen", async () => {
    const history = createMemoryHistory({ initialEntries: ["/admin"] });
    render(
      <HelmetProvider>
        <Router location={history.location} navigator={history}>
          <AdminAddAnimal />
        </Router>
      </HelmetProvider>
    );

    const fields = screen.getAllByRole("textbox").map((field) => {
      return field.id;
    });
    const comboboxes = screen.getAllByRole("combobox").map((combo) => {
      return combo.id;
    });
    const noImageChosen = screen.getByText(/no file chosen/i);
    // console.log(fields);
    // console.log(comboboxes);

    expect(fields.length).toBe(3);
    expect(comboboxes.length).toBe(6);
  });
});
