import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./navbar";

// Mock next-auth/react
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: {
      user: { name: "Test User", email: "test@example.com", image: "" },
    },
    status: "authenticated",
  })),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

// Mock next-themes
jest.mock("next-themes", () => ({
  useTheme: jest.fn(() => ({ theme: "light", setTheme: jest.fn() })),
}));

describe("Navbar component", () => {
  it("should render without crashing", () => {
    render(<Navbar />);
    const element = screen.getByRole("banner");
    expect(element).toBeInTheDocument();
  });

  it("should render the search input", () => {
    render(<Navbar />);
    const searchInput = screen.getByPlaceholderText(
      "Search files, folders, and more...",
    );
    expect(searchInput).toBeInTheDocument();
  });

  it("should render the user avatar when authenticated", () => {
    render(<Navbar />);
    const avatar = screen.getByTestId("user-menu-trigger");
    expect(avatar).toBeInTheDocument();
  });
});
