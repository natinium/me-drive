import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import DriveActionsMenu from "./drive-actions-menu";

describe("DriveActionsMenu component", () => {
  const mockOnNewFolderClick = jest.fn();
  const mockOnUploadFileClick = jest.fn();

  beforeEach(() => {
    mockOnNewFolderClick.mockClear();
    mockOnUploadFileClick.mockClear();
  });

  it("should render the New button", () => {
    render(
      <DriveActionsMenu
        onNewFolderClick={mockOnNewFolderClick}
        onUploadFileClick={mockOnUploadFileClick}
      />,
    );
    expect(screen.getByRole("button", { name: /New/i })).toBeInTheDocument();
  });

  it("should open the dropdown menu on button click", () => {
    render(
      <DriveActionsMenu
        onNewFolderClick={mockOnNewFolderClick}
        onUploadFileClick={mockOnUploadFileClick}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /New/i }));
    expect(screen.getByText("New Folder")).toBeInTheDocument();
    expect(screen.getByText("Upload File")).toBeInTheDocument();
  });

  it("should call onNewFolderClick when New Folder is clicked", () => {
    render(
      <DriveActionsMenu
        onNewFolderClick={mockOnNewFolderClick}
        onUploadFileClick={mockOnUploadFileClick}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /New/i }));
    fireEvent.click(screen.getByText("New Folder"));
    expect(mockOnNewFolderClick).toHaveBeenCalledTimes(1);
  });

  it("should call onUploadFileClick when Upload File is clicked", () => {
    render(
      <DriveActionsMenu
        onNewFolderClick={mockOnNewFolderClick}
        onUploadFileClick={mockOnUploadFileClick}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /New/i }));
    fireEvent.click(screen.getByText("Upload File"));
    expect(mockOnUploadFileClick).toHaveBeenCalledTimes(1);
  });
});
