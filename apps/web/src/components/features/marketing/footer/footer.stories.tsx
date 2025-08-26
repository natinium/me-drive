import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Footer from "./footer";

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

const meta: Meta<typeof Footer> = {
  title: "Components/Features/Marketing/Footer",
  component: Footer,
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {},
};
