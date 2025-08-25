import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import GlobalModals from "./global-modals";
import { useDriveStore } from "@/stores/drive-store";

// Mock the drive store
jest.mock("@/stores/drive-store");
const mockUseDriveStore = useDriveStore as jest.Mock;

describe("GlobalModals component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockUseDriveStore.mockReturnValue({
      isCreateFolderModalOpen: false,
      isUploadModalOpen: false,
      uploadFiles: [],
      closeCreateFolderModal: jest.fn(),
      closeUploadModal: jest.fn(),
      setUploadFiles: jest.fn(),
    });
  });

  it("should not render any dialog by default", () => {
    render(<GlobalModals />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("should render the Create Folder modal when open", () => {
    mockUseDriveStore.mockReturnValueOnce({
      ...mockUseDriveStore(),
      isCreateFolderModalOpen: true,
    });
    render(<GlobalModals />);
    expect(screen.getByText("Create New Folder")).toBeInTheDocument();
  });

  it("should render the Upload Files modal when open", () => {
    mockUseDriveStore.mockReturnValueOnce({
      ...mockUseDriveStore(),
      isUploadModalOpen: true,
    });
    render(<GlobalModals />);
    expect(screen.getByText("Upload Files")).toBeInTheDocument();
  });
});
