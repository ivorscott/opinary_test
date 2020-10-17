import React from "react";
import {
  render,
  fireEvent,
  waitForDomChange,
  screen,
} from "@testing-library/react";
import { mockResultStore } from "./api";
import { Poll } from "./Poll";

// mockResultStore is located inside Poll/api.js

// It contains 2 polls, predefined for testing purposes with pollIds
// for example: pollIds => "feel-today" and "tax-spending"

describe("Poll Component", () => {
  test("loads and displays poll", async () => {
    render(<Poll pollId="feel-today" />);

    const questionText = mockResultStore["feel-today"].question;
    const { A, B, C } = mockResultStore["feel-today"].choices;

    await waitForDomChange(() => screen.getByText(questionText));

    expect(screen.getByText(questionText)).toBeInTheDocument();
    expect(screen.getByText(A)).toBeInTheDocument();
    expect(screen.getByText(B)).toBeInTheDocument();
    expect(screen.getByText(C)).toBeInTheDocument();
  });

  test("loads and displays poll results", async () => {
    render(<Poll pollId="tax-spending" />);

    const questionText = mockResultStore["tax-spending"].question;
    const { A } = mockResultStore["tax-spending"].choices;

    await waitForDomChange(() => screen.getByText(questionText));

    expect(screen.getByRole("heading")).not.toHaveTextContent("Results");
    expect(screen.queryByRole("description")).not.toBeInTheDocument();
    expect(screen.queryByRole("chart")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText(A));

    await waitForDomChange(() => screen.getByText("Results"));

    expect(screen.getByRole("heading")).toHaveTextContent("Results");
    expect(screen.getByRole("description")).toHaveTextContent(questionText);
    expect(screen.getByRole("chart")).toBeInTheDocument();
  });

  test("decision increments result value for option", () => {
    // TODO
  });

  test("loader is removed when data arrives", () => {
    // TODO
  });
});
