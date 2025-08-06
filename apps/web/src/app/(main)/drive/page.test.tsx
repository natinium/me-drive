import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import MyDrivePage from "./page";

// Mock Next.js router
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
}));

// Mock the child components to isolate the MyDrivePage component
vi.mock("@/components/features/drive", () => ({
  FolderBrowser: vi.fn(() => <div data-testid="folder-browser" />),
}));

describe("MyDrivePage", () => {
  it("should render the main heading and subheading", () => {
    render(<MyDrivePage />);

    expect(
      screen.getByRole("heading", { name: /my drive/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/manage all your files and folders/i),
    ).toBeInTheDocument();
  });

  it("should render the table with files and folders", () => {
    render(<MyDrivePage />);

    expect(screen.getByRole("table")).toBeInTheDocument();
  });
});
