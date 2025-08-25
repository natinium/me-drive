import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PricingSection from "./pricing-section";

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

describe("PricingSection component", () => {
  it("should render without crashing", () => {
    render(<PricingSection />);
    expect(screen.getByText("Simple, transparent pricing")).toBeInTheDocument();
  });

  it("should render all pricing plans", () => {
    render(<PricingSection />);
    expect(screen.getByText("Free")).toBeInTheDocument();
    expect(screen.getByText("Pro")).toBeInTheDocument();
    expect(screen.getByText("Business")).toBeInTheDocument();
  });

  it("should render features for each plan", () => {
    render(<PricingSection />);
    expect(screen.getByText("5 GB storage")).toBeInTheDocument();
    expect(screen.getByText("500 GB storage")).toBeInTheDocument();
    expect(screen.getByText("5 TB storage")).toBeInTheDocument();
  });

  it('should render the "Most Popular" badge for the Pro plan', () => {
    render(<PricingSection />);
    expect(screen.getByText("Most Popular")).toBeInTheDocument();
  });
});
