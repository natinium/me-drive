import { render, screen } from "@testing-library/react";
import { Header } from "./Header";
import { describe, it, expect } from "vitest";

describe("Header", () => {
  it("renders the header with navigation links", () => {
    render(<Header />);
    expect(screen.getByText("Features")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });
});
