import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import DriveActionsMenu from "./drive-actions-menu";

export default {
  title: "Components/Features/Drive/DriveActionsMenu",
  component: DriveActionsMenu,
} as ComponentMeta<typeof DriveActionsMenu>;

const Template: ComponentStory<typeof DriveActionsMenu> = (args) => (
  <DriveActionsMenu {...args} />
);

export const Default = Template.bind({});
Default.args = {
  onNewFolderClick: () => alert("New Folder clicked"),
  onUploadFileClick: () => alert("Upload File clicked"),
};
