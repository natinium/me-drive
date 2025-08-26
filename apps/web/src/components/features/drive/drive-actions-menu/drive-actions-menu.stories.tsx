import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import DriveActionsMenu from "./drive-actions-menu";

const meta: Meta<typeof DriveActionsMenu> = {
  title: "Components/Features/Drive/DriveActionsMenu",
  component: DriveActionsMenu,
};

export default meta;
type Story = StoryObj<typeof DriveActionsMenu>;

export const Default: Story = {
  args: {
    onNewFolderClick: () => alert("New Folder clicked"),
    onUploadFileClick: () => alert("Upload File clicked"),
  },
};
