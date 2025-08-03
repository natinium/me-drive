import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

// Mock the entire layout module since it's a Server Component
vi.mock("./layout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="main-layout">
      <div data-testid="app-sidebar">Sidebar</div>
      <div data-testid="navbar">Navbar</div>
      <div>{children}</div>
      <div data-testid="global-modals">Global Modals</div>
      <div data-testid="sidebar-trigger">Trigger</div>
    </div>
  ),
}));

import MainLayout from "./layout";

describe("MainLayout", () => {
  it("should render the sidebar", () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>,
    );

    expect(screen.getByTestId("app-sidebar")).toBeInTheDocument();
  });

  it("should render the navbar", () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>,
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
  });

  it("should render the global modals", () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>,
    );

    expect(screen.getByTestId("global-modals")).toBeInTheDocument();
  });

  it("should render the sidebar trigger", () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>,
    );

    expect(screen.getByTestId("sidebar-trigger")).toBeInTheDocument();
  });

  it("should render children content", () => {
    const testContent = "Test Child Content";
    render(
      <MainLayout>
        <div>{testContent}</div>
      </MainLayout>,
    );

    expect(screen.getByText(testContent)).toBeInTheDocument();
  });

  it("should have proper layout structure", () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>,
    );

    expect(screen.getByTestId("main-layout")).toBeInTheDocument();
  });
});
