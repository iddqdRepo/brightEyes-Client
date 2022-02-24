import { act, render, screen, cleanup, getAllByTestId } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Adoption from "../Adoption";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import axios from "axios";
import "@testing-library/jest-dom";
import { HelmetProvider } from "react-helmet-async";

jest.mock("axios");

beforeEach(() =>
  axios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: [
        {
          adopted: "No",
          age: "6",
          breed: "Spitz",
          desc: "Koda description test",
          id: "dc8e4d8f-09e6-48b1-94fb-6bda3a6ae683",
          image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
          name: "Koda",
          size: "Medium",
          suitableForAnimals: "Yes",
          suitableForChildren: "Yes",
          type: "Dog",
          updatedAt: "2021-12-27T13:00:41.248Z",
          yearsOrMonths: "Years",
        },
        {
          adopted: "Yes",
          age: "9",
          breed: "Test",
          desc: " description test",
          id: "dc8e988f-09e6-48b1-94fb-6bda3a6ae683",
          image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAA",
          name: "Copper",
          size: "Small",
          suitableForAnimals: "Yes",
          suitableForChildren: "Yes",
          type: "Dog",
          updatedAt: "2021-12-27T13:00:41.248Z",
          yearsOrMonths: "Years",
        },
      ],
    })
  )
);

afterEach(cleanup);

describe("Adoption Component Tests", () => {
  test("should take user to forms when adoption form button is clicked", async () => {
    const history = createMemoryHistory({ initialEntries: ["/adoption"] });
    await act(async () => {
      render(
        <HelmetProvider>
          <Router location={history.location} navigator={history}>
            <Adoption />
          </Router>
        </HelmetProvider>
      );
    });
    const button = screen.getByRole("button", { name: /adoption form/i });
    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(history.location.pathname).toBe("/forms");
  });

  test("should take user to forms when adoption form button is clicked", async () => {
    const history = createMemoryHistory({ initialEntries: ["/adoption"] });
    await act(async () => {
      render(
        <HelmetProvider>
          <Router location={history.location} navigator={history}>
            <Adoption />
          </Router>
        </HelmetProvider>
      );
    });

    const donateButton = screen.getByRole("button", {
      name: /Donate/i,
    });

    expect(history.location.pathname).toBe("/adoption");
    userEvent.click(donateButton);

    expect(history.location.pathname).toBe("/donate");
  });

  test("should show the correct number of animals received from db & doesn't show adopted animals", async () => {
    const history = createMemoryHistory({ initialEntries: ["/adoption"] });
    await act(async () => {
      render(
        <HelmetProvider>
          <Router location={history.location} navigator={history}>
            <Adoption />
          </Router>
        </HelmetProvider>
      );
    });
    const animals = screen.getAllByTestId("AnimalContainer");
    expect(animals).toHaveLength(1);
  });

  test("view button on individual animal should redirect to viewBio", async () => {
    const history = createMemoryHistory({ initialEntries: ["/adoption"] });
    await act(async () => {
      render(
        <HelmetProvider>
          <Router location={history.location} navigator={history}>
            <Adoption />
          </Router>
        </HelmetProvider>
      );
    });
    const viewAnimalButton = screen.getByRole("button", { name: /view koda/i });
    userEvent.click(viewAnimalButton);
    expect(history.location.pathname).toBe("/adoption/viewBio");
  });
});
