import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import MyDrivePage from "./page";
import { useSession } from "next-auth/react";
import * as api from "@/lib/api";

// Mock the next/navigation module
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock the next-auth/react module
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(),
}));

// Mock the api module
vi.mock("@/lib/api");

describe("MyDrivePage", () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.resetAllMocks();

    // Mock useSession
    (useSession as jest.Mock).mockReturnValue({
      data: { accessToken: "fake-token" },
      status: "authenticated",
    });

    // Mock API functions
    (api.listFolders as jest.Mock).mockResolvedValue({
      data: {
        folders: [
          {
            id: "1",
            name: "Test Folder",
            itemType: "folder",
            updatedAt: new Date().toISOString(),
          },
        ],
      },
    });
    (api.listFiles as jest.Mock).mockResolvedValue({ data: { files: [] } });
    (api.getFolderPath as jest.Mock).mockResolvedValue({ data: [] });
  });

  it("should display the folder created by the user", async () => {
    render(<MyDrivePage />);

    // Wait for the table to be populated
    await waitFor(() => {
      expect(screen.getByText("Test Folder")).toBeInTheDocument();
    });
  });
});
