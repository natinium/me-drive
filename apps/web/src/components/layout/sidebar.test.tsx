import { render, screen, fireEvent } from "@testing-library/react";
import { AppSidebar } from "./sidebar";
import { describe, it, expect, vi } from "vitest";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

// Mock the usePathname hook
vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

// Mock the next-auth/react hook
vi.mock("next-auth/react");

describe("AppSidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the sidebar with navigation links", () => {
    (usePathname as vi.Mock).mockReturnValue("/dashboard");
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: "unauthenticated",
      update: vi.fn(),
    });

    render(<AppSidebar />);

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("My Drive")).toBeInTheDocument();
  });

  it("highlights the active link based on the current pathname", () => {
    (usePathname as vi.Mock).mockReturnValue("/drive");
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: "unauthenticated",
      update: vi.fn(),
    });

    render(<AppSidebar />);

    // You might need to adjust the class name based on your actual implementation
    expect(screen.getByRole("link", { name: "My Drive" })).toHaveClass(
      "bg-muted",
    );
    expect(screen.getByRole("link", { name: "Dashboard" })).not.toHaveClass(
      "bg-muted",
    );
  });

  it("should display the user's name after login", async () => {
    (usePathname as vi.Mock).mockReturnValue("/dashboard");
    const { rerender } = render(<AppSidebar />);

    // Initially, the user is not logged in
    vi.mocked(useSession).mockReturnValue({
      data: null,
      status: "unauthenticated",
      update: vi.fn(),
    });
    rerender(<AppSidebar />);
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();

    // Simulate a login
    vi.mocked(useSession).mockReturnValue({
      data: {
        user: { name: "John Doe", email: "john@example.com", id: "1" },
      },
      status: "authenticated",
      update: vi.fn(),
    });

    rerender(<AppSidebar />);

    // The user's name should now be displayed
    expect(await screen.findByText("John Doe")).toBeInTheDocument();
  });
});
