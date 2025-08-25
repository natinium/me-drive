import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Preloader from "./preloader";

describe("Preloader component", () => {
  it("should render the loading message initially", () => {
    render(<Preloader />);
    expect(screen.getByText("Loading MeDrive...")).toBeInTheDocument();
  });

  it("should disappear after a simulated loading time", async () => {
    jest.useFakeTimers();
    render(<Preloader />);
    expect(screen.getByText("Loading MeDrive...")).toBeInTheDocument();

    jest.advanceTimersByTime(1500);

    await waitFor(() => {
      expect(screen.queryByText("Loading MeDrive...")).not.toBeInTheDocument();
    });
    jest.useRealTimers();
  });
});
