import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UploadModal from "./upload-modal";
import { useSession } from "next-auth/react";
import { uploadFile } from "@/lib/api";
import { toast } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock hooks and functions
jest.mock("next-auth/react");
jest.mock("@/lib/api");
jest.mock("sonner");

// Mock react-dropzone
jest.mock("react-dropzone", () => ({
  useDropzone: jest.fn(() => ({
    getRootProps: () => ({}),
    getInputProps: () => ({}),
    isDragActive: false,
  })),
}));

const queryClient = new QueryClient();

describe("UploadModal component", () => {
  const mockOnOpenChange = jest.fn();
  const mockUseSession = useSession as jest.Mock;
  const mockUploadFile = uploadFile as jest.Mock;
  const mockToastSuccess = toast.success as jest.Mock;
  const mockToastError = toast.error as jest.Mock;

  beforeEach(() => {
    mockOnOpenChange.mockClear();
    mockUseSession.mockClear();
    mockUploadFile.mockClear();
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
        <UploadModal
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
    expect(screen.getByText("Upload File")).toBeInTheDocument();
    expect(
      screen.getByText("Select files to upload to the current folder."),
    ).toBeInTheDocument();
  });

  it("should call onOpenChange with false when Cancel is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockOnOpenChange).toHaveBeenCalledWith(false);
  });

  it("should show error toast if no files are selected on upload", async () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: /Upload Files/i }));
    expect(mockToastError).toHaveBeenCalledWith(
      "Please select at least one file to upload",
    );
    expect(mockUploadFile).not.toHaveBeenCalled();
  });

  it("should upload files and close modal on successful upload", async () => {
    mockUploadFile.mockResolvedValue({});
    // Mock useDropzone to return files
    require("react-dropzone").useDropzone.mockReturnValue({
      getRootProps: () => ({}),
      getInputProps: () => ({}),
      isDragActive: false,
      acceptedFiles: [
        new File(["content"], "test.txt", { type: "text/plain" }),
      ],
    });

    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /Upload Files/i }));

    await waitFor(() => {
      expect(mockUploadFile).toHaveBeenCalledTimes(1);
      expect(mockToastSuccess).toHaveBeenCalledWith(
        "1 file(s) uploaded successfully",
      );
      expect(mockOnOpenChange).toHaveBeenCalledWith(false);
    });
  });

  it("should show error toast on failed file upload", async () => {
    mockUploadFile.mockRejectedValue(new Error("Upload failed"));
    require("react-dropzone").useDropzone.mockReturnValue({
      getRootProps: () => ({}),
      getInputProps: () => ({}),
      isDragActive: false,
      acceptedFiles: [
        new File(["content"], "test.txt", { type: "text/plain" }),
      ],
    });

    renderComponent();

    fireEvent.click(screen.getByRole("button", { name: /Upload Files/i }));

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalledWith("Upload failed");
    });
  });
});
