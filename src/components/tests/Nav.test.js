import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Nav from "../Nav";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom";
import { HelmetProvider } from "react-helmet-async";

beforeEach(() => {});

describe("Nav Component Tests", () => {
  test("should take user to home page when home is clicked", () => {
    const history = createMemoryHistory({ initialEntries: ["/about"] });
    render(
      <Router location={history.location} navigator={history}>
        <Nav />
      </Router>
    );

    const homeLink = screen.getByTestId("navHome");
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe("/");
  });

  test("should take user to about page when about us is clicked", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <Router location={history.location} navigator={history}>
        <Nav />
      </Router>
    );

    const aboutLink = screen.getByTestId("navAbout Us");
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe("/about");
  });

  test("should take user to adoption page when adoption is clicked", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <Router location={history.location} navigator={history}>
        <Nav />
      </Router>
    );

    const adoptionLink = screen.getByTestId("navAdoption");
    userEvent.click(adoptionLink);
    expect(history.location.pathname).toBe("/adoption");
  });

  test("should take user to donate page when donate is clicked", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <Router location={history.location} navigator={history}>
        <Nav />
      </Router>
    );

    const donateLink = screen.getByTestId("navDonate");
    userEvent.click(donateLink);
    expect(history.location.pathname).toBe("/donate");
  });

  test("should take user to volunteer page when volunteer is clicked", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <Router location={history.location} navigator={history}>
        <Nav />
      </Router>
    );

    const volunteerLink = screen.getByTestId("navVolunteer");
    userEvent.click(volunteerLink);
    expect(history.location.pathname).toBe("/forms/volunteer");
  });

  test("should take user to forms page when forms is clicked", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <Router location={history.location} navigator={history}>
        <Nav />
      </Router>
    );

    const formsLink = screen.getByTestId("navForms");
    userEvent.click(formsLink);
    expect(history.location.pathname).toBe("/forms");
  });
});
