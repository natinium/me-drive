import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import EmptyState from "./empty-state";

describe("EmptyState component", () => {
  it("should render default file empty state", () => {
    render(<EmptyState />);
    expect(screen.getByText("No files found")).toBeInTheDocument();
    expect(
      screen.getByText("Upload files or create folders to get started."),
    ).toBeInTheDocument();
  });

  it("should render folder empty state", () => {
    render(<EmptyState type="folders" />);
    expect(screen.getByText("No folders found")).toBeInTheDocument();
    expect(
      screen.getByText("Create a new folder to get started."),
    ).toBeInTheDocument();
  });

  it("should render search empty state", () => {
    render(<EmptyState type="search" />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
    expect(
      screen.getByText("Try searching with different keywords."),
    ).toBeInTheDocument();
  });

  it("should render upload empty state", () => {
    render(<EmptyState type="upload" />);
    expect(screen.getByText("Upload your first file")).toBeInTheDocument();
    expect(
      screen.getByText("Drag and drop files here or click to browse."),
    ).toBeInTheDocument();
  });

  it("should render custom title and description", () => {
    render(
      <EmptyState title="Custom Title" description="Custom Description" />,
    );
    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom Description")).toBeInTheDocument();
  });

  it("should render action button and call onAction", () => {
    const handleAction = jest.fn();
    render(<EmptyState actionLabel="Click Me" onAction={handleAction} />);
    const button = screen.getByRole("button", { name: /Click Me/i });
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(handleAction).toHaveBeenCalledTimes(1);
  });
});
