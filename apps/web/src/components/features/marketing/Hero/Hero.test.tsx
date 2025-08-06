import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";
import { describe, it, expect } from "vitest";

describe("Hero", () => {
  it("renders the hero section with the main heading", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { name: /Your Personal Cloud Storage/i }),
    ).toBeInTheDocument();
  });
});
