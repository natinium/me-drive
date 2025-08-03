import React from "react";
import { render, screen } from "@testing-library/react";
import MyDrivePage from "./page";

// Mock the child components to isolate the MyDrivePage component
vi.mock("@/components/features/drive", () => ({
  FolderBrowser: vi.fn(() => <div data-testid="folder-browser" />),
}));

describe("MyDrivePage", () => {
  it("should render the main heading and subheading", () => {
    render(<MyDrivePage />);

    expect(
      screen.getByRole("heading", { name: /my drive/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/manage all your files and folders/i),
    ).toBeInTheDocument();
  });

  it("should render the FolderBrowser component", () => {
    render(<MyDrivePage />);

    expect(screen.getByTestId("folder-browser")).toBeInTheDocument();
  });
});
