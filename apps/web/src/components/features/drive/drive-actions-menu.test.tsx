import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import { DriveActionsMenu } from "./drive-actions-menu";
import { useDriveStore } from "@/stores/drive-store";

// Mock the drive store
vi.mock("@/stores/drive-store", () => ({
  useDriveStore: vi.fn(),
}));

// Mock the UI components
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

vi.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: any) => <div>{children}</div>,
  DropdownMenuContent: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
  DropdownMenuItem: ({ children, onClick, ...props }: any) => (
    <div {...props} onClick={onClick} data-testid="dropdown-item">
      {children}
    </div>
  ),
  DropdownMenuTrigger: ({ children, ...props }: any) => (
    <div {...props}>{children}</div>
  ),
}));

describe("DriveActionsMenu", () => {
  const mockOpenCreateFolderModal = vi.fn();
  const mockOpenUploadModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useDriveStore as any).mockReturnValue({
      openCreateFolderModal: mockOpenCreateFolderModal,
      openUploadModal: mockOpenUploadModal,
    });
  });

  it('should render the "New" button', () => {
    render(<DriveActionsMenu />);

    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("should render the dropdown menu items", () => {
    render(<DriveActionsMenu />);

    expect(screen.getByText("New Folder")).toBeInTheDocument();
    expect(screen.getByText("Upload File")).toBeInTheDocument();
  });

  it("should call openCreateFolderModal when New Folder is clicked", () => {
    render(<DriveActionsMenu />);

    const newFolderItem = screen.getByText("New Folder");
    fireEvent.click(newFolderItem);

    expect(mockOpenCreateFolderModal).toHaveBeenCalledWith(undefined);
  });

  it("should call openCreateFolderModal with folderId when provided", () => {
    const folderId = "test-folder-id";
    render(<DriveActionsMenu folderId={folderId} />);

    const newFolderItem = screen.getByText("New Folder");
    fireEvent.click(newFolderItem);

    expect(mockOpenCreateFolderModal).toHaveBeenCalledWith(folderId);
  });

  it("should call openUploadModal when Upload File is clicked", () => {
    render(<DriveActionsMenu />);

    const uploadFileItem = screen.getByText("Upload File");
    fireEvent.click(uploadFileItem);

    expect(mockOpenUploadModal).toHaveBeenCalledWith(undefined);
  });

  it("should call openUploadModal with folderId when provided", () => {
    const folderId = "test-folder-id";
    render(<DriveActionsMenu folderId={folderId} />);

    const uploadFileItem = screen.getByText("Upload File");
    fireEvent.click(uploadFileItem);

    expect(mockOpenUploadModal).toHaveBeenCalledWith(folderId);
  });
});
