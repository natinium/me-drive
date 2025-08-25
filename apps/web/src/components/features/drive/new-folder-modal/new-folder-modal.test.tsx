import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import NewFolderModal from "./new-folder-modal";
import { useSession } from "next-auth/react";
import { createFolder } from "@/lib/api";
import { toast } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock hooks and functions
jest.mock("next-auth/react");
jest.mock("@/lib/api");
jest.mock("sonner");

const queryClient = new QueryClient();

describe("NewFolderModal component", () => {
  const mockOnOpenChange = jest.fn();
  const mockUseSession = useSession as jest.Mock;
  const mockCreateFolder = createFolder as jest.Mock;
  const mockToastSuccess = toast.success as jest.Mock;
  const mockToastError = toast.error as jest.Mock;

  beforeEach(() => {
    mockOnOpenChange.mockClear();
    mockUseSession.mockClear();
    mockCreateFolder.mockClear();
    mockToastSuccess.mockClear();
    mockToastError.mockClear();

    mockUseSession.mockReturnValue({
      data: { accessToken: "test-token" },
      status: "authenticated",
    });
  });

  const renderComponent = (props = {}) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <NewFolderModal
          open={true}
          onOpenChange={mockOnOpenChange}
          currentFolderId="root"
          {...props}
        />
      </QueryClientProvider>,
    );
  };

  it("should render the modal title and description", () => {
    renderComponent();
    expect(screen.getByText("New Folder")).toBeInTheDocument();
    expect(
      screen.getByText("Enter a name for your new folder."),
    ).toBeInTheDocument();
  });

  it("should update folder name on input change", () => {
    renderComponent();
    const input = screen.getByPlaceholderText("Folder name");
    fireEvent.change(input, { target: { value: "Test Folder" } });
    expect(input).toHaveValue("Test Folder");
  });

  it("should call onOpenChange with false when Cancel is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it("should show error toast if folder name is empty on create", async () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: /Create Folder/i }));
    expect(mockToastError).toHaveBeenCalledWith("Folder name cannot be empty");
    expect(mockCreateFolder).not.toHaveBeenCalled();
  });

  it("should create folder and close modal on successful creation", async () => {
    mockCreateFolder.mockResolvedValue({});
    renderComponent();

    const input = screen.getByPlaceholderText("Folder name");
    fireEvent.change(input, { target: { value: "New Folder Name" } });
    fireEvent.click(screen.getByRole("button", { name: /Create Folder/i }));

    await waitFor(() => {
      expect(mockCreateFolder).toHaveBeenCalledWith("test-token", {
        name: "New Folder Name",
        parentId: "root",
      });
      expect(mockToastSuccess).toHaveBeenCalledWith(
        'Folder "New Folder Name" created',
      );
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it("should show error toast on failed folder creation", async () => {
    mockCreateFolder.mockRejectedValue(new Error("API Error"));
    renderComponent();

    const input = screen.getByPlaceholderText("Folder name");
    fireEvent.change(input, { target: { value: "Error Folder" } });
    fireEvent.click(screen.getByRole("button", { name: /Create Folder/i }));

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith("API Error");
    });
  });
});
