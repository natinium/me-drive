import React from "react";
import { render, screen } from "@testing-library/react";
import DashboardPage from "./page";

// Mock the child components to isolate the DashboardPage component
vi.mock("@/components/features/dashboard", () => ({
  DashboardStats: vi.fn(() => <div data-testid="dashboard-stats" />),
  RecentFilesTable: vi.fn(() => <div data-testid="recent-files-table" />),
  StorageBreakdown: vi.fn(() => <div data-testid="storage-breakdown" />),
}));

describe("DashboardPage", () => {
  it("should render the main heading and subheading", () => {
    render(<DashboardPage />);

    expect(
      screen.getByRole("heading", { name: /dashboard/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/welcome back!/i)).toBeInTheDocument();
  });

  it("should render the DashboardStats component", () => {
    render(<DashboardPage />);

    expect(screen.getByTestId("dashboard-stats")).toBeInTheDocument();
  });

  it("should render the RecentFilesTable component", () => {
    render(<DashboardPage />);

    expect(screen.getByTestId("recent-files-table")).toBeInTheDocument();
  });

  it("should render the StorageBreakdown component", () => {
    render(<DashboardPage />);

    expect(screen.getByTestId("storage-breakdown")).toBeInTheDocument();
  });
});
