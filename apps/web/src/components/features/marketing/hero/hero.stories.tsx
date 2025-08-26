import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Hero from "./hero";

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

const meta: Meta<typeof Hero> = {
  title: "Components/Features/Marketing/Hero",
  component: Hero,
};

export default meta;
type Story = StoryObj<typeof Hero>;

export const Default: Story = {
  args: {},
};
