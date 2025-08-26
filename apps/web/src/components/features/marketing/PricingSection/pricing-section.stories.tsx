import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import PricingSection from "./pricing-section";

// Mock next/link for Storybook
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} onClick={(e) => e.preventDefault()}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

const meta: Meta<typeof PricingSection> = {
  title: "Components/Features/Marketing/PricingSection",
  component: PricingSection,
};

export default meta;
type Story = StoryObj<typeof PricingSection>;

export const Default: Story = {
  args: {},
};
