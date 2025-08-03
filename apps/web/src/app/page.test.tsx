import { render, screen } from "@testing-library/react";
import Home from "./page";
import { describe, it, expect, vi } from "vitest";

// Mock child components
vi.mock("@/components/features/marketing/Header", () => ({
  Header: vi.fn(() => <header data-testid="header" />),
}));
vi.mock("@/components/features/marketing/Hero", () => ({
  Hero: vi.fn(() => <div data-testid="hero" />),
}));
vi.mock("@/components/features/marketing/FeatureSection", () => ({
  FeatureSection: vi.fn(() => <div data-testid="feature-section" />),
}));
vi.mock("@/components/features/marketing/CTA", () => ({
  CTA: vi.fn(() => <div data-testid="cta" />),
}));
vi.mock("@/components/features/marketing/Footer", () => ({
  Footer: vi.fn(() => <footer data-testid="footer" />),
}));

describe("Home Page", () => {
  it("renders all the main marketing page components", () => {
    render(<Home />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("hero")).toBeInTheDocument();
    expect(screen.getByTestId("feature-section")).toBeInTheDocument();
    expect(screen.getByTestId("cta")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
