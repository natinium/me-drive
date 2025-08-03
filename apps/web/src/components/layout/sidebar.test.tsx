import { render, screen, fireEvent } from "@testing-library/react";
import { Sidebar } from "./sidebar";
import { describe, it, expect, vi } from "vitest";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

// Mock the usePathname hook
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

// Mock the next-auth/react hook
vi.mock("next-auth/react", () => ({
  signOut: vi.fn(),
}));

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the sidebar with navigation links and logout button", () => {
    (usePathname as vi.Mock).mockReturnValue("/dashboard");

    render(<Sidebar />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("My Drive")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "href",
      "/dashboard",
    );
    expect(screen.getByRole("link", { name: "My Drive" })).toHaveAttribute(
      "href",
      "/drive",
    );
    expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute(
      "href",
      "/profile",
    );
    expect(screen.getByRole("link", { name: "Settings" })).toHaveAttribute(
      "href",
      "/settings",
    );
  });

  it("highlights the active link based on the current pathname", () => {
    (usePathname as vi.Mock).mockReturnValue("/drive");

    render(<Sidebar />);

    expect(screen.getByRole("link", { name: "My Drive" })).toHaveClass(
      "bg-muted",
    );
    expect(screen.getByRole("link", { name: "Dashboard" })).not.toHaveClass(
      "bg-muted",
    );
  });

  it("calls signOut when the logout button is clicked", () => {
    (usePathname as vi.Mock).mockReturnValue("/dashboard"); // Mock any path

    render(<Sidebar />);
    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
