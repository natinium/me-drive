import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RecentFilesTable from "./recent-files-table";

describe("RecentFilesTable component", () => {
  const mockFiles = [
    {
      id: "1",
      name: "document.pdf",
      mimeType: "application/pdf",
      size: 1024,
      updatedAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "image.png",
      mimeType: "image/png",
      size: 2048,
      updatedAt: new Date().toISOString(),
    },
  ];

  it("should render without crashing", () => {
    render(<RecentFilesTable files={[]} />);
    const element = screen.getByText("Recent Files");
    expect(element).toBeInTheDocument();
  });

  it("should render the title and description", () => {
    render(
      <RecentFilesTable
        files={[]}
        title="My Files"
        description="A list of my files"
      />,
    );
    expect(screen.getByText("My Files")).toBeInTheDocument();
    expect(screen.getByText("A list of my files")).toBeInTheDocument();
  });

  it("should display a message when there are no files", () => {
    render(<RecentFilesTable files={[]} />);
    expect(screen.getByText("No recent files")).toBeInTheDocument();
  });

  it("should render a table with files", () => {
    render(<RecentFilesTable files={mockFiles} />);
    expect(screen.getByText("document.pdf")).toBeInTheDocument();
    expect(screen.getByText("image.png")).toBeInTheDocument();
  });
});
