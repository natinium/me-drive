import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import CTA from "./cta";

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

const meta: Meta<typeof CTA> = {
  title: "Components/Features/Marketing/CTA",
  component: CTA,
};

export default meta;
type Story = StoryObj<typeof CTA>;

export const Default: Story = {
  args: {},
};
