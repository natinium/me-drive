import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AboutSection from "./about-section";

export default {
  title: "Components/Features/Marketing/AboutSection",
  component: AboutSection,
} as ComponentMeta<typeof AboutSection>;

const Template: ComponentStory<typeof AboutSection> = (args) => (
  <AboutSection {...args} />
);

export const Default = Template.bind({});
Default.args = {};
