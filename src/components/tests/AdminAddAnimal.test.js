import { act, render, screen, cleanup, getAllByTestId, getAllByRole } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import AdminAddAnimal from "../AdminComponents/AdminAddAnimal";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import axios from "axios";
import "@testing-library/jest-dom";
import { HelmetProvider } from "react-helmet-async";
jest.mock("axios");

describe("Adoption Component Tests", () => {
  test("All form fields should be visible with no image chosen", async () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
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
    expect(fields.length).toBe(4);
    expect(comboboxes.length).toBe(6);
  });

  test("Form should prompt 'Please fill in all fields' ", async () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <HelmetProvider>
        <Router location={history.location} navigator={history}>
          <AdminAddAnimal />
        </Router>
      </HelmetProvider>
    );

    const addAnimalButton = screen.getByRole("button", { name: /add animal/i });
    userEvent.click(addAnimalButton);

    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument();
  });

  test("Fill in form fields and test correct pop up notification shows' ", async () => {
    const message = { message: "was added successfully" };
    // const message = { message: "Error saving animal to the databse" };
    const response = { data: message };
    axios.post.mockImplementationOnce(() => Promise.resolve(response));

    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <HelmetProvider>
        <Router location={history.location} navigator={history}>
          <AdminAddAnimal />
        </Router>
      </HelmetProvider>
    );
    const addAnimalButton = screen.getByRole("button", { name: /add animal/i });

    const type = screen.getByRole("combobox", { name: /type:/i });
    userEvent.selectOptions(type, "Dog");

    const name = screen.getByRole("textbox", { name: /name:/i });
    userEvent.type(name, "Koda");

    const age = screen.getByRole("textbox", { name: /age:/i });
    userEvent.type(age, "8");

    const yearsOrMonths = screen.getByTestId("yearsOrMonths");
    userEvent.selectOptions(yearsOrMonths, "Years");

    const breed = screen.getByRole("textbox", { name: /breed:/i });
    userEvent.type(breed, "spitz");

    const size = screen.getByRole("combobox", { name: /size:/i });
    userEvent.selectOptions(size, "Medium");

    // const file = new File(["hello"], "hello.png", { type: "image/png" });
    // const fileUpload = screen.getByLabelText(/animal image/i);
    // await act(async () => {
    //   userEvent.upload(fileUpload, file);
    // });
    // console.log("fileUpload.files[0] ", fileUpload.files[0]);
    // expect(fileUpload.files[0]).toStrictEqual(file);
    // expect(fileUpload.files.item(0)).toStrictEqual(file);
    // expect(fileUpload.files).toHaveLength(1);

    const suitableForChildren = screen.getByRole("combobox", { name: /suitable for children:/i });
    userEvent.selectOptions(suitableForChildren, "Yes");

    //^Test clicking the button when all fields aren't filled in
    await act(async () => {
      userEvent.click(addAnimalButton);
    });
    expect(screen.getByText("Please fill in all fields")).toBeInTheDocument();
    userEvent.click(screen.getByRole("button", { name: /ok/i }));

    const suitableForAnimals = screen.getByRole("combobox", { name: /suitable for animals:/i });
    userEvent.selectOptions(suitableForAnimals, "Yes");

    const adopted = screen.getByRole("combobox", { name: /adopted:/i });
    userEvent.selectOptions(adopted, "No");

    const desc = screen.getByRole("textbox", { name: /description:/i });
    userEvent.type(desc, "Lorem Ipsum");

    const fileUpload = screen.getByLabelText(/animal image/i);

    await act(async () => {
      userEvent.click(addAnimalButton);
    });
    expect(screen.getByText("Koda was added successfully")).toBeInTheDocument();
  });

  test("Should return Error saving animal to the database' ", async () => {
    const message = { message: "Error saving animal to the database" };
    const response = { data: message };
    axios.post.mockImplementationOnce(() => Promise.resolve(response));
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <HelmetProvider>
        <Router location={history.location} navigator={history}>
          <AdminAddAnimal />
        </Router>
      </HelmetProvider>
    );
    const addAnimalButton = screen.getByRole("button", { name: /add animal/i });

    const type = screen.getByRole("combobox", { name: /type:/i });
    userEvent.selectOptions(type, "Dog");

    const name = screen.getByRole("textbox", { name: /name:/i });
    userEvent.type(name, "Koda");

    const age = screen.getByRole("textbox", { name: /age:/i });
    userEvent.type(age, "8");

    const yearsOrMonths = screen.getByTestId("yearsOrMonths");
    userEvent.selectOptions(yearsOrMonths, "Years");

    const breed = screen.getByRole("textbox", { name: /breed:/i });
    userEvent.type(breed, "spitz");

    const size = screen.getByRole("combobox", { name: /size:/i });
    userEvent.selectOptions(size, "Medium");

    const suitableForChildren = screen.getByRole("combobox", { name: /suitable for children:/i });
    userEvent.selectOptions(suitableForChildren, "Yes");

    const suitableForAnimals = screen.getByRole("combobox", { name: /suitable for animals:/i });
    userEvent.selectOptions(suitableForAnimals, "Yes");

    const adopted = screen.getByRole("combobox", { name: /adopted:/i });
    userEvent.selectOptions(adopted, "No");

    const desc = screen.getByRole("textbox", { name: /description:/i });
    userEvent.type(desc, "Lorem Ipsum");

    const fileUpload = screen.getByLabelText(/animal image/i);

    await act(async () => {
      userEvent.click(addAnimalButton);
    });
    expect(screen.getByText("Error saving animal to the database")).toBeInTheDocument();
  });
});
