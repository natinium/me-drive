import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Header from "./header";

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

// Mock shadcn/ui components for Storybook
jest.mock("@/components/ui/sheet", () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SheetContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  SheetTrigger: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
}));

const meta: Meta<typeof Header> = {
  title: "Components/Features/Marketing/Header",
  component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};
