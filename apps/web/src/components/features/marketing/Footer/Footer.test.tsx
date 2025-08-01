import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";
import { describe, it, expect } from "vitest";

describe("Footer", () => {
  it("renders the footer with copyright information", () => {
    render(<Footer />);
    expect(
      screen.getByText(/© 2024 MeDrive. All rights reserved./i),
    ).toBeInTheDocument();
  });
});
