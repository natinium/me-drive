import { render, screen } from "@testing-library/react";
import { CTA } from "./CTA";
import { describe, it, expect } from "vitest";

describe("CTA", () => {
  it("renders the CTA section with a sign-up button", () => {
    render(<CTA />);
    expect(screen.getByRole("link", { name: /Sign Up/i })).toBeInTheDocument();
  });
});
