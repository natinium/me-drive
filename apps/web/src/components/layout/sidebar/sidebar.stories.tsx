import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AppSidebar from "./sidebar";

export default {
  title: "Components/Layout/AppSidebar",
  component: AppSidebar,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof AppSidebar>;

const Template: ComponentStory<typeof AppSidebar> = (args) => (
  <div style={{ height: "100vh" }}>
    <AppSidebar {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
