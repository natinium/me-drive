import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TestimonialsSection from "./testimonials-section";

describe("TestimonialsSection component", () => {
  it("should render without crashing", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText("What Our Users Say")).toBeInTheDocument();
  });

  it("should render all testimonials", () => {
    render(<TestimonialsSection />);
    expect(screen.getByText("Alex Johnson")).toBeInTheDocument();
    expect(screen.getByText("Sarah Williams")).toBeInTheDocument();
    expect(screen.getByText("Michael Chen")).toBeInTheDocument();
  });

  it("should render testimonial content", () => {
    render(<TestimonialsSection />);
    expect(
      screen.getByText(
        /MeDrive has transformed how we handle sensitive client data/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /As a freelancer, I needed a reliable storage solution/i,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Implementing MeDrive across our organization was seamless/i,
      ),
    ).toBeInTheDocument();
  });
});
