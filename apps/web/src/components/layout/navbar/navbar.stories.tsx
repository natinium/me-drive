import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Navbar from "./navbar";

export default {
  title: "Components/Layout/Navbar",
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Default = Template.bind({});
Default.args = {};
