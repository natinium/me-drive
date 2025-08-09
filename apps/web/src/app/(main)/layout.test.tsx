import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import MainLayout from "./layout";

// Mock child components to isolate the layout
vi.mock("@/components/layout/sidebar", () => ({
  AppSidebar: () => <div data-testid="app-sidebar">Sidebar</div>,
}));

vi.mock("@/components/layout/navbar", () => ({
  Navbar: () => <div data-testid="navbar">Navbar</div>,
}));

vi.mock("@/components/layout/global-modals", () => ({
  GlobalModals: () => <div data-testid="global-modals">Global Modals</div>,
}));

// Mock the SessionProvider as the layout now depends on it.
vi.mock("@/components/providers/session-provider", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="session-provider">{children}</div>
  ),
}));

// Mock next-auth to handle getServerSession call
vi.mock("next-auth", async () => {
  const originalModule = await vi.importActual("next-auth");
  return {
    ...originalModule,
    getServerSession: vi.fn(() => Promise.resolve(null)), // Default to no session
  };
});

describe("MainLayout Server Component", () => {
  it("should render all the main structural components", async () => {
    const testContent = "Test Child Content";
    // Since it's an async component, we need to handle the promise
    const LayoutComponent = await MainLayout({
      children: <div>{testContent}</div>,
    });
    render(LayoutComponent);

    expect(screen.getByTestId("app-sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("global-modals")).toBeInTheDocument();
    expect(screen.getByTestId("session-provider")).toBeInTheDocument();
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });
});
