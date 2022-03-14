import { act, render, screen, cleanup } from "@testing-library/react";
import React from "react";
import AnimalBio from "../AnimalBio";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import "@testing-library/jest-dom";
import { HelmetProvider } from "react-helmet-async";
jest.mock("axios");

beforeEach(() =>
  axios.get.mockImplementationOnce(() =>
    Promise.resolve({
      data: {
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
        _id: "621f5364b07143de54ac61fe",
      },
    })
  )
);

afterEach(cleanup);

describe("Adoption Component Tests", () => {
  test("should show correct animal and correct details in viewbio", async () => {
    //^ Get this to render the proper detail, like in form adoption
    await act(async () => {
      render(
        <HelmetProvider>
          <MemoryRouter
            initialEntries={[
              {
                pathname: "/adoption/viewBio",
                state: {
                  detail: "621f5364b07143de54ac61fe",
                },
              },
            ]}
          >
            <AnimalBio />
          </MemoryRouter>
        </HelmetProvider>
      );
    });

    expect(screen.getByText(/bio for koda/i)).toBeInTheDocument();
    expect(screen.getByText(/6 years/i)).toBeInTheDocument();
    expect(screen.getByText(/spitz/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /adoption form/i })).toBeInTheDocument();
  });
});
