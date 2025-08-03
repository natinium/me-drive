import { render, screen } from "@testing-library/react";
import { GlobalModals } from "./global-modals";
import { describe, it, expect, vi } from "vitest";

// Mock the individual modal components
vi.mock("@/components/features/drive/new-folder-modal", () => ({
  NewFolderModal: vi.fn(() => <div data-testid="new-folder-modal" />),
}));
vi.mock("@/components/features/drive/file-details-modal", () => ({
  FileDetailsModal: vi.fn(() => <div data-testid="file-details-modal" />),
}));
vi.mock("@/components/features/drive/rename-item-modal", () => ({
  RenameItemModal: vi.fn(() => <div data-testid="rename-item-modal" />),
}));
vi.mock("@/components/features/drive/delete-item-modal", () => ({
  DeleteItemModal: vi.fn(() => <div data-testid="delete-item-modal" />),
}));
vi.mock("@/components/features/drive/share-item-modal", () => ({
  ShareItemModal: vi.fn(() => <div data-testid="share-item-modal" />),
}));
vi.mock("@/components/features/drive/move-item-modal", () => ({
  MoveItemModal: vi.fn(() => <div data-testid="move-item-modal" />),
}));

describe("GlobalModals", () => {
  it("renders all the mocked modal components", () => {
    render(<GlobalModals />);

    expect(screen.getByTestId("new-folder-modal")).toBeInTheDocument();
    expect(screen.getByTestId("file-details-modal")).toBeInTheDocument();
    expect(screen.getByTestId("rename-item-modal")).toBeInTheDocument();
    expect(screen.getByTestId("delete-item-modal")).toBeInTheDocument();
    expect(screen.getByTestId("share-item-modal")).toBeInTheDocument();
    expect(screen.getByTestId("move-item-modal")).toBeInTheDocument();
  });
});
