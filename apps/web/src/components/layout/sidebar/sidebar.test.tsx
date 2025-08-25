import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AppSidebar from "./sidebar";

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: {
      user: { name: "Test User" },
    },
    status: "authenticated",
  })),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/dashboard"),
}));

// Mock stores
jest.mock("@/stores/drive-store", () => ({
  useDriveStore: jest.fn(() => ({
    openUploadModal: jest.fn(),
    openCreateFolderModal: jest.fn(),
  })),
}));

describe("AppSidebar component", () => {
  it("should render without crashing", () => {
    render(<AppSidebar />);
    const element = screen.getByText("MeDrive");
    expect(element).toBeInTheDocument();
  });

  it("should render navigation links", () => {
    render(<AppSidebar />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("My Drive")).toBeInTheDocument();
  });

  it("should show the active link", () => {
    render(<AppSidebar />);
    const dashboardLink = screen.getByText("Dashboard").closest("a");
    expect(dashboardLink).toHaveAttribute("data-active", "true");
  });
});
