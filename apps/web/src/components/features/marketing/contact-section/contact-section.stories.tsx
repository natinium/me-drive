import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ContactSection from "./contact-section";

export default {
  title: "Components/Features/Marketing/ContactSection",
  component: ContactSection,
} as ComponentMeta<typeof ContactSection>;

const Template: ComponentStory<typeof ContactSection> = (args) => (
  <ContactSection {...args} />
);

export const Default = Template.bind({});
Default.args = {};
