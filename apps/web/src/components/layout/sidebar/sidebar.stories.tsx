import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import AppSidebar from "./sidebar";

const meta: Meta<typeof AppSidebar> = {
  title: "Components/Layout/AppSidebar",
  component: AppSidebar,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof AppSidebar>;

export const Default: Story = {
  args: {},
  render: () => (
    <div style={{ height: "100vh" }}>
      <AppSidebar />
    </div>
  ),
};
