import { render, screen } from "@testing-library/react";
import { Sidebar } from "@/components/layout/sidebar";
import { describe, it, expect } from "vitest";

describe("Sidebar", () => {
  it("renders the sidebar with navigation links", () => {
    render(<Sidebar />);
    expect(screen.getByText("FileManager")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("My Drive")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  // TODO: Add more tests for mobile sidebar, new button dropdown, theme toggle, etc.
});
