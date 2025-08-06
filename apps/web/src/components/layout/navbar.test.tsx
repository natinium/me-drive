import { render, screen } from "@testing-library/react";
import { Navbar } from "./navbar";
import { describe, it, expect, vi } from "vitest";
import { useSession } from "next-auth/react";

vi.mock("next-auth/react");

describe("Navbar", () => {
  it("should display the user's name after login", async () => {
    const { rerender } = render(<Navbar />);

    // Initially, the user is not logged in
    expect(screen.queryByText("John Doe")).not.toBeInTheDocument();

    // Simulate a login
    vi.mocked(useSession).mockReturnValue({
      data: {
        user: { name: "John Doe", email: "john@example.com", id: "1" },
      },
      status: "authenticated",
      update: vi.fn(),
    });

    rerender(<Navbar />);

    // The user's name should now be displayed
    expect(await screen.findByText("John Doe")).toBeInTheDocument();
  });
});
