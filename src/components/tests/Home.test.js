import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Home from "../Home";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom";
import axios from "axios";
import { HelmetProvider } from "react-helmet-async";

jest.mock("axios");

describe("Home Component Tests", () => {
  test("should take user to about page when learn more is clicked", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <HelmetProvider>
        <Router location={history.location} navigator={history}>
          <Home />
        </Router>
      </HelmetProvider>
    );
    const learnMoreButton = screen.getByRole("button", {
      name: /learn more/i,
    });
    expect(history.location.pathname).toBe("/");
    userEvent.click(learnMoreButton);
    expect(history.location.pathname).toBe("/about");
  });

  test("should take user to adoption page when more info is clicked", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByTestId } = render(
      <HelmetProvider>
        <Router location={history.location} navigator={history}>
          <Home />
        </Router>
      </HelmetProvider>
    );

    expect(history.location.pathname).toBe("/");
    userEvent.click(getByTestId("moreInfoAdoptButton"));
    expect(history.location.pathname).toBe("/adoption");
  });

  test("should take user to donate page when more info is clicked", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByTestId } = render(
      <HelmetProvider>
        <Router location={history.location} navigator={history}>
          <Home />
        </Router>
      </HelmetProvider>
    );
    expect(history.location.pathname).toBe("/");
    fireEvent.click(getByTestId("moreInfoDonateButton"));
    expect(history.location.pathname).toBe("/donate");
  });

  test("should take user to volunteer page when more info is clicked", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { getByTestId } = render(
      <HelmetProvider>
        <Router location={history.location} navigator={history}>
          <Home />
        </Router>
      </HelmetProvider>
    );
    expect(history.location.pathname).toBe("/");
    fireEvent.click(getByTestId("moreInfoVolunteerButton"));
    expect(history.location.pathname).toBe("/forms/volunteer");
  });

  test("should update fields when user types", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    render(
      <HelmetProvider>
        <Router location={history.location} navigator={history}>
          <Home />
        </Router>
      </HelmetProvider>
    );
    const name = screen.getByRole("textbox", {
      name: /name/i,
    });
    const email = screen.getByRole("textbox", {
      name: /email/i,
    });
    const message = screen.getByRole("textbox", {
      name: /message/i,
    });
    const inputword = "hello";
    userEvent.type(name, inputword);
    expect(name.value).toBe("hello");
    userEvent.type(email, inputword);
    expect(email.value).toBe("hello");
    userEvent.type(message, inputword);
    expect(message.value).toBe("hello");
  });
});
