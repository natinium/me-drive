import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./header";

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

// Mock shadcn/ui components if they are not simple divs
jest.mock("@/components/ui/sheet", () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SheetTrigger: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
}));

describe("Header component", () => {
  it("should render without crashing", () => {
    render(<Header />);
    expect(screen.getByText("MeDrive")).toBeInTheDocument();
  });

  it("should render navigation links", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /Features/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Pricing/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /About/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Contact/i })).toBeInTheDocument();
  });

  it("should render sign in and sign up buttons", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /Sign In/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Sign Up/i })).toBeInTheDocument();
  });
});
