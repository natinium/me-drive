import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FeatureSection from "./feature-section";

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

describe("FeatureSection component", () => {
  it("should render without crashing", () => {
    render(<FeatureSection />);
    expect(
      screen.getByText("Everything You Need in a Cloud Storage"),
    ).toBeInTheDocument();
  });

  it("should render all feature cards", () => {
    render(<FeatureSection />);
    expect(screen.getByText("File Storage")).toBeInTheDocument();
    expect(screen.getByText("Folder Management")).toBeInTheDocument();
    expect(screen.getByText("Easy Sharing")).toBeInTheDocument();
    expect(screen.getByText("Top-tier Security")).toBeInTheDocument();
    expect(screen.getByText("Self-Hosted")).toBeInTheDocument();
    expect(screen.getByText("Team Collaboration")).toBeInTheDocument();
  });

  it('should render the "View all features" link', () => {
    render(<FeatureSection />);
    const link = screen.getByRole("link", { name: /View all features/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/features");
  });
});
