import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import AuthHeader from "./auth-header";

// Mock the Logo component for Storybook
jest.mock("@/components/ui/logo", () => ({
  Logo: (props: any) => (
    <div {...props} style={{ border: "1px solid gray", padding: "5px" }}>
      Mock Logo
    </div>
  ),
}));

const meta: Meta<typeof AuthHeader> = {
  title: "Components/Features/Auth/AuthHeader",
  component: AuthHeader,
};

export default meta;
type Story = StoryObj<typeof AuthHeader>;

export const Default: Story = {
  args: {},
};
