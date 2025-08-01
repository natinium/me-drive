import { render, screen } from "@testing-library/react";
import Home from "./page";
import { describe, it, expect } from "vitest";

describe("Home Page", () => {
  it("renders the main heading of the hero section", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { name: /Your Personal Cloud Storage/i }),
    ).toBeInTheDocument();
  });
});
