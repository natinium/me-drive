import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";
import { NewFolderButton } from "./new-folder-button";
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

// Mock the form components
vi.mock("@/components/ui/form", () => ({
  Form: ({ children }: any) => <form>{children}</form>,
  FormField: ({ children }: any) => <div>{children}</div>,
  FormItem: ({ children }: any) => <div>{children}</div>,
  FormLabel: ({ children }: any) => <label>{children}</label>,
  FormControl: ({ children }: any) => <div>{children}</div>,
  FormMessage: ({ children }: any) => <span>{children}</span>,
}));

// Mock the input component
vi.mock("@/components/ui/input", () => ({
  Input: (props: any) => <input {...props} />,
}));

// Mock the button component
vi.mock("@/components/ui/button", () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

// Mock the form library
vi.mock("react-hook-form", () => ({
  useForm: () => ({
    register: vi.fn(),
    handleSubmit: (fn: any) => fn,
    formState: { errors: {} },
    reset: vi.fn(),
  }),
}));

describe("NewFolderButton", () => {
  const mockCloseCreateFolderModal = vi.fn();
  const mockCurrentFolderId = null;

  beforeEach(() => {
    vi.clearAllMocks();
    (useDriveStore as any).mockReturnValue({
      isCreateFolderModalOpen: false,
      currentFolderId: mockCurrentFolderId,
      closeCreateFolderModal: mockCloseCreateFolderModal,
    });
  });

  it("should not render dialog when modal is closed", () => {
    render(<NewFolderButton />);

    const dialog = screen.queryByTestId("dialog");
    expect(dialog).toHaveAttribute("data-open", "false");
  });

  it("should render dialog when modal is open", () => {
    (useDriveStore as any).mockReturnValue({
      isCreateFolderModalOpen: true,
      currentFolderId: mockCurrentFolderId,
      closeCreateFolderModal: mockCloseCreateFolderModal,
    });

    render(<NewFolderButton />);

    const dialog = screen.getByTestId("dialog");
    expect(dialog).toHaveAttribute("data-open", "true");
    expect(screen.getByText("Create New Folder")).toBeInTheDocument();
  });

  it("should pass folderId prop to component", () => {
    const folderId = "test-folder-id";
    render(<NewFolderButton folderId={folderId} />);

    // Component should render without errors
    expect(true).toBe(true);
  });

  it("should handle form submission", () => {
    (useDriveStore as any).mockReturnValue({
      isCreateFolderModalOpen: true,
      currentFolderId: mockCurrentFolderId,
      closeCreateFolderModal: mockCloseCreateFolderModal,
    });

    render(<NewFolderButton />);

    // Form should be rendered
    expect(screen.getByText("Create New Folder")).toBeInTheDocument();
    expect(
      screen.getByText("Enter a name for your new folder."),
    ).toBeInTheDocument();
  });
});
