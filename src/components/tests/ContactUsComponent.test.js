import { act, fireEvent, render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import ContactUsComponent from "../ContactUsComponent";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom";
import axios from "axios";
import { HelmetProvider } from "react-helmet-async";

jest.mock("axios");
afterEach(cleanup);

describe("Home Component Tests", () => {
  test("should provide the correct error message if fields are blank or incorrect email regex and submit button is clicked", () => {
    render(<ContactUsComponent />);
    const blankFieldsErrorText = screen.queryByText(/Please fill in all fields/i);
    const emailErrorText = screen.queryByText(/Please enter a valid email address/i);
    const button = screen.getByRole("button", {
      name: /submit/i,
    });
    const nameInput = screen.getByRole("textbox", {
      name: /name/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const messageInput = screen.getByRole("textbox", {
      name: /message/i,
    });
    expect(blankFieldsErrorText).not.toBeInTheDocument();
    expect(emailErrorText).not.toBeInTheDocument();
    userEvent.click(button);
    const blankFieldsErrorTextAfter = screen.queryByText(/Please fill in all fields/i);
    expect(blankFieldsErrorTextAfter).toBeInTheDocument();

    userEvent.type(nameInput, "chris");
    userEvent.type(emailInput, "chris");
    userEvent.type(messageInput, "chris");

    userEvent.click(button);
    const emailErrorTextAfter = screen.queryByText(/Please enter a valid email address/i);
    expect(emailErrorTextAfter).toBeInTheDocument();
  });

  test("should show correct response message when message is submitted successfully", async () => {
    const message = { message: "Success" };
    const response = { data: message };
    axios.post.mockImplementationOnce(() => Promise.resolve(response));

    render(<ContactUsComponent />);

    const button = screen.getByRole("button", {
      name: /submit/i,
    });
    const nameInput = screen.getByRole("textbox", {
      name: /name/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const messageInput = screen.getByRole("textbox", {
      name: /message/i,
    });

    userEvent.type(nameInput, "chris");
    userEvent.type(emailInput, "chris@chris.com");
    userEvent.type(messageInput, "chris");
    await act(async () => {
      userEvent.click(button);
    });
    const emailErrorTextAfter = screen.queryByText(/message sent successfully/i);
    expect(emailErrorTextAfter).toBeInTheDocument();
  });

  test("should show correct response message when message sending failed", async () => {
    const message = { message: "Error Sending Message" };
    const response = { data: message };
    axios.post.mockImplementationOnce(() => Promise.resolve());

    render(<ContactUsComponent />);

    const button = screen.getByRole("button", {
      name: /submit/i,
    });
    const nameInput = screen.getByRole("textbox", {
      name: /name/i,
    });
    const emailInput = screen.getByRole("textbox", {
      name: /email/i,
    });
    const messageInput = screen.getByRole("textbox", {
      name: /message/i,
    });

    userEvent.type(nameInput, "chris");
    userEvent.type(emailInput, "chris@chris.com");
    userEvent.type(messageInput, "chris");
    await act(async () => {
      userEvent.click(button);
    });
    const emailErrorTextAfter = screen.queryByText(/Our email Server is down, please message us on Facebook/i);
    expect(emailErrorTextAfter).toBeInTheDocument();
  });
});
