import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FAQSection from "./faq-section";

describe("FAQSection component", () => {
  it("should render without crashing", () => {
    render(<FAQSection />);
    expect(screen.getByText("Frequently Asked Questions")).toBeInTheDocument();
  });

  it("should render all FAQ questions", () => {
    render(<FAQSection />);
    expect(screen.getByText("What is MeDrive?")).toBeInTheDocument();
    expect(
      screen.getByText(
        "How is MeDrive different from other cloud storage services?",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Do I need technical expertise to use MeDrive?"),
    ).toBeInTheDocument();
    expect(screen.getByText("Is MeDrive secure?")).toBeInTheDocument();
    expect(
      screen.getByText("Can I collaborate with others using MeDrive?"),
    ).toBeInTheDocument();
    expect(
      screen.getByText("What are the system requirements for self-hosting?"),
    ).toBeInTheDocument();
  });
});
