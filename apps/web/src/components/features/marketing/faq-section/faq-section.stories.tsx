import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import FAQSection from "./faq-section";

export default {
  title: "Components/Features/Marketing/FAQSection",
  component: FAQSection,
} as ComponentMeta<typeof FAQSection>;

const Template: ComponentStory<typeof FAQSection> = (args) => (
  <FAQSection {...args} />
);

export const Default = Template.bind({});
Default.args = {};
