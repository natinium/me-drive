import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from "./hero";

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

describe("Hero component", () => {
  it("should render without crashing", () => {
    render(<Hero />);
    expect(screen.getByText("Your Personal Cloud Storage")).toBeInTheDocument();
  });

  it("should render the description text", () => {
    render(<Hero />);
    expect(
      screen.getByText(
        /Securely store, share, and access your files from anywhere/i,
      ),
    ).toBeInTheDocument();
  });

  it('should render the "Get Started" button with correct link', () => {
    render(<Hero />);
    const getStartedButton = screen.getByRole("link", { name: /Get Started/i });
    expect(getStartedButton).toBeInTheDocument();
    expect(getStartedButton).toHaveAttribute("href", "/signup");
  });

  it('should render the "Learn More" button with correct link', () => {
    render(<Hero />);
    const learnMoreButton = screen.getByRole("link", { name: /Learn More/i });
    expect(learnMoreButton).toBeInTheDocument();
    expect(learnMoreButton).toHaveAttribute("href", "#features");
  });
});
