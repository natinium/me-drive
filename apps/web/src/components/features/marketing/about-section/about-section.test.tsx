import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AboutSection from "./about-section";

describe("AboutSection component", () => {
  it("should render without crashing", () => {
    render(<AboutSection />);
    expect(
      screen.getByText("Built for Privacy and Control"),
    ).toBeInTheDocument();
  });

  it("should render the mission statement", () => {
    render(<AboutSection />);
    expect(
      screen.getByText(/We believe that your data belongs to you/i),
    ).toBeInTheDocument();
  });

  it("should render all value cards", () => {
    render(<AboutSection />);
    expect(screen.getByText("Self-Hosted")).toBeInTheDocument();
    expect(screen.getByText("Privacy First")).toBeInTheDocument();
    expect(screen.getByText("Open Source")).toBeInTheDocument();
    expect(screen.getByText("Global Access")).toBeInTheDocument();
  });
});
