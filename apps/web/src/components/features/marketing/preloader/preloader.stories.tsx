import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Preloader from "./preloader";

export default {
  title: "Components/Features/Marketing/Preloader",
  component: Preloader,
} as ComponentMeta<typeof Preloader>;

const Template: ComponentStory<typeof Preloader> = (args) => (
  <Preloader {...args} />
);

export const Default = Template.bind({});
Default.args = {};
