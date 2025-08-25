import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthHeader from "./auth-header";

// Mock the Logo component if it's not a simple div
jest.mock("@/components/ui/logo", () => ({
  Logo: () => <div data-testid="logo-mock">Logo</div>,
}));

describe("AuthHeader component", () => {
  it("should render without crashing", () => {
    render(<AuthHeader />);
    expect(screen.getByText("MeDrive")).toBeInTheDocument();
  });

  it("should render the logo", () => {
    render(<AuthHeader />);
    expect(screen.getByTestId("logo-mock")).toBeInTheDocument();
  });

  it("should render the title", () => {
    render(<AuthHeader />);
    expect(
      screen.getByRole("heading", { level: 1, name: /MeDrive/i }),
    ).toBeInTheDocument();
  });
});
