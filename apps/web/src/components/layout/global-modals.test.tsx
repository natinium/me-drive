import { render, screen } from "@testing-library/react";
import { GlobalModals } from "./global-modals";
import { describe, it, expect, vi } from "vitest";
import { useDriveStore } from "@/stores/drive-store";

// Mock the individual modal components
vi.mock("@/components/features/drive/new-folder-modal", () => ({
  NewFolderModal: vi.fn(() => null),
}));
vi.mock("@/components/features/drive/file-details-modal", () => ({
  FileDetailsModal: vi.fn(() => null),
}));
vi.mock("@/components/features/drive/rename-item-modal", () => ({
  RenameItemModal: vi.fn(() => null),
}));
vi.mock("@/components/features/drive/delete-item-modal", () => ({
  DeleteItemModal: vi.fn(() => null),
}));
vi.mock("@/components/features/drive/share-item-modal", () => ({
  ShareItemModal: vi.fn(() => null),
}));
vi.mock("@/components/features/drive/move-item-modal", () => ({
  MoveItemModal: vi.fn(() => null),
}));

vi.mock("@/stores/drive-store", () => ({
  useDriveStore: vi.fn(),
}));

describe("GlobalModals", () => {
  it("renders create folder modal when open", () => {
    (useDriveStore as unknown as vi.Mock).mockReturnValue({
      isCreateFolderModalOpen: true,
      isUploadModalOpen: false,
      uploadFiles: [],
      currentFolderId: null,
      closeCreateFolderModal: vi.fn(),
      closeUploadModal: vi.fn(),
      setUploadFiles: vi.fn(),
    });

    render(<GlobalModals />);
    expect(screen.getByText("Create New Folder")).toBeInTheDocument();
  });

  it("renders upload modal when open", () => {
    (useDriveStore as unknown as vi.Mock).mockReturnValue({
      isCreateFolderModalOpen: false,
      isUploadModalOpen: true,
      uploadFiles: [],
      currentFolderId: null,
      closeCreateFolderModal: vi.fn(),
      closeUploadModal: vi.fn(),
      setUploadFiles: vi.fn(),
    });

    render(<GlobalModals />);
    expect(screen.getByText("Upload Files")).toBeInTheDocument();
  });

  it("does not render modals when closed", () => {
    (useDriveStore as unknown as vi.Mock).mockReturnValue({
      isCreateFolderModalOpen: false,
      isUploadModalOpen: false,
      uploadFiles: [],
      currentFolderId: null,
      closeCreateFolderModal: vi.fn(),
      closeUploadModal: vi.fn(),
      setUploadFiles: vi.fn(),
    });

    render(<GlobalModals />);
    expect(screen.queryByText("Create New Folder")).not.toBeInTheDocument();
    expect(screen.queryByText("Upload Files")).not.toBeInTheDocument();
  });
});
