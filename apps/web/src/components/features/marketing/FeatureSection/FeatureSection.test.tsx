import { render, screen } from "@testing-library/react";
import { FeatureSection } from "./FeatureSection";
import { describe, it, expect } from "vitest";

describe("FeatureSection", () => {
  it("renders the feature section with key features", () => {
    render(<FeatureSection />);
    expect(screen.getByText("File Storage")).toBeInTheDocument();
    expect(screen.getByText("Easy Sharing")).toBeInTheDocument();
    expect(screen.getByText("Top-tier Security")).toBeInTheDocument();
  });
});
