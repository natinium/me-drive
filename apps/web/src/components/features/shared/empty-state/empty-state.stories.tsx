import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import EmptyState from "./empty-state";

const meta: Meta<typeof EmptyState> = {
  title: "Components/Features/Shared/EmptyState",
  component: EmptyState,
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {},
};

export const FoldersEmpty: Story = {
  args: {
    type: "folders",
  },
};

export const SearchEmpty: Story = {
  args: {
    type: "search",
  },
};

export const UploadEmpty: Story = {
  args: {
    type: "upload",
  },
};

export const WithActionButton: Story = {
  args: {
    actionLabel: "Create New",
    onAction: () => alert("Action clicked!"),
  },
};

export const CustomContent: Story = {
  args: {
    title: "No Data Available",
    description: "There is no data to display based on your current filters.",
  },
};
