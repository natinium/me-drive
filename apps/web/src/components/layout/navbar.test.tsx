import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Navbar } from "./navbar";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";

// Mock next-themes
vi.mock("next-themes", () => ({
  useTheme: () => ({
    theme: "light",
    setTheme: vi.fn(),
  }),
}));

// Mock next-auth/react
vi.mock("next-auth/react");

// Mock the router
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => "/",
}));

describe("Navbar", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.mocked(useSession).mockClear();
  });

  it("should not render user info when logged out", () => {
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
    render(<Navbar />);
    expect(screen.queryByTestId("user-menu-trigger")).not.toBeInTheDocument();
  });

  it("should display the user's name and email after login", async () => {
    const mockSession = {
      expires: "1",
      user: {
        id: "1",
        name: "Test User",
        email: "test@example.com",
        image: "",
      },
      accessToken: "test-token",
    };

    vi.mocked(useSession).mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });

    render(<Navbar />);

    const dropdownTrigger = screen.getByTestId("user-menu-trigger");
    fireEvent.click(dropdownTrigger);

    await waitFor(() => {
      expect(screen.getByText("Test User")).toBeInTheDocument();
      expect(screen.getByText("test@example.com")).toBeInTheDocument();
    });
  });
});
