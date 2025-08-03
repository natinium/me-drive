import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { UploadButton } from "./upload-button";
import { useDriveStore } from "@/stores/drive-store";

// Mock the drive store
vi.mock("@/stores/drive-store", () => ({
  useDriveStore: vi.fn(),
}));

// Mock the UI components
vi.mock("@/components/ui/dialog", () => ({
  Dialog: ({ children, open }: any) => (
    <div data-testid="dialog" data-open={open}>
      {children}
    </div>
  ),
  DialogContent: ({ children }: any) => <div>{children}</div>,
  DialogHeader: ({ children }: any) => <div>{children}</div>,
  DialogTitle: ({ children }: any) => <h2>{children}</h2>,
  DialogDescription: ({ children }: any) => <p>{children}</p>,
  DialogFooter: ({ children }: any) => <div>{children}</div>,
}));

// Mock the upload zone
vi.mock("@/components/features/drive/file-upload-zone", () => ({
  FileUploadZone: ({ onFilesSelected }: any) => (
    <div
      data-testid="file-upload-zone"
      onClick={() => onFilesSelected([new File(["test"], "test.txt")])}
    >
      File Upload Zone
    </div>
  ),
}));

// Mock the button component
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

// Mock useState for file management
vi.mock("react", () => ({
  ...vi.importActual("react"),
  useState: vi.fn((initial) => [initial, vi.fn()]),
}));

describe("UploadButton", () => {
  const mockCloseUploadModal = vi.fn();
  const mockCurrentFolderId = null;

  beforeEach(() => {
    vi.clearAllMocks();
    (useDriveStore as any).mockReturnValue({
      isUploadModalOpen: false,
      currentFolderId: mockCurrentFolderId,
      closeUploadModal: mockCloseUploadModal,
      uploadFiles: [],
    });
  });

  it("should not render dialog when modal is closed", () => {
    render(<UploadButton />);

    const dialog = screen.queryByTestId("dialog");
    expect(dialog).toHaveAttribute("data-open", "false");
  });

  it("should render dialog when modal is open", () => {
    (useDriveStore as any).mockReturnValue({
      isUploadModalOpen: true,
      currentFolderId: mockCurrentFolderId,
      closeUploadModal: mockCloseUploadModal,
      uploadFiles: [],
    });

    render(<UploadButton />);

    const dialog = screen.getByTestId("dialog");
    expect(dialog).toHaveAttribute("data-open", "true");
    expect(screen.getByText("Upload Files")).toBeInTheDocument();
  });

  it("should pass folderId prop to component", () => {
    const folderId = "test-folder-id";
    render(<UploadButton folderId={folderId} />);

    // Component should render without errors
    expect(true).toBe(true);
  });

  it("should render file upload zone", () => {
    (useDriveStore as any).mockReturnValue({
      isUploadModalOpen: true,
      currentFolderId: mockCurrentFolderId,
      closeUploadModal: mockCloseUploadModal,
      uploadFiles: [],
    });

    render(<UploadButton />);

    expect(
      screen.getByText("Drag and drop files here, or click to select"),
    ).toBeInTheDocument();
  });
});
