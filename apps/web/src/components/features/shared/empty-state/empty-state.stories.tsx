import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import EmptyState from "./empty-state";

export default {
  title: "Components/Features/Shared/EmptyState",
  component: EmptyState,
} as ComponentMeta<typeof EmptyState>;

const Template: ComponentStory<typeof EmptyState> = (args) => (
  <EmptyState {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const FoldersEmpty = Template.bind({});
FoldersEmpty.args = {
  type: "folders",
};

export const SearchEmpty = Template.bind({});
SearchEmpty.args = {
  type: "search",
};

export const UploadEmpty = Template.bind({});
UploadEmpty.args = {
  type: "upload",
};

export const WithActionButton = Template.bind({});
WithActionButton.args = {
  actionLabel: "Create New",
  onAction: () => alert("Action clicked!"),
};

export const CustomContent = Template.bind({});
CustomContent.args = {
  title: "No Data Available",
  description: "There is no data to display based on your current filters.",
};
