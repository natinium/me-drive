import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ContactSection from "./contact-section";

describe("ContactSection component", () => {
  it("should render without crashing", () => {
    render(<ContactSection />);
    expect(screen.getByText("Get in Touch")).toBeInTheDocument();
  });

  it("should render contact information", () => {
    render(<ContactSection />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Office")).toBeInTheDocument();
  });

  it("should render the message form", () => {
    render(<ContactSection />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Subject")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Send Message/i }),
    ).toBeInTheDocument();
  });
});
