import { render, screen } from "@testing-library/react";
import { Navbar } from "@/components/layout/navbar";
import { describe, it, expect } from "vitest";

describe("Navbar", () => {
  it("renders the navbar with search input and user avatar", () => {
    render(<Navbar />);
    expect(screen.getByPlaceholderText("Search files...")).toBeInTheDocument();
    expect(screen.getByText("JD")).toBeInTheDocument(); // Avatar fallback
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  // TODO: Add more tests for dropdown menu interactions, mobile sidebar trigger, dynamic breadcrumbs, etc.
});
