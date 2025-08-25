import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import CTA from "./cta";

// Mock next/link
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => <a href={href}>{children}</a>;
  MockLink.displayName = "MockLink";
  return MockLink;
});

describe("CTA component", () => {
  it("should render without crashing", () => {
    render(<CTA />);
    expect(
      screen.getByText("Ready to Take Control of Your Data?"),
    ).toBeInTheDocument();
  });

  it("should render the call to action text", () => {
    render(<CTA />);
    expect(screen.getByText(/Sign up for MeDrive today/i)).toBeInTheDocument();
  });

  it("should render the Sign Up button with correct link", () => {
    render(<CTA />);
    const signUpButton = screen.getByRole("link", { name: /Sign Up/i });
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute("href", "/signup");
  });
});
