import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./footer";

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

describe("Footer component", () => {
  it("should render without crashing", () => {
    render(<Footer />);
    expect(screen.getByText(/© 2024 MeDrive/i)).toBeInTheDocument();
  });

  it("should render navigation links", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: /Features/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Pricing/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Contact/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Terms/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Privacy/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Sign In/i })).toBeInTheDocument();
  });
});
