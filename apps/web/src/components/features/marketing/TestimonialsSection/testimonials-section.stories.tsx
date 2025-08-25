import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TestimonialsSection from "./testimonials-section";

export default {
  title: "Components/Features/Marketing/TestimonialsSection",
  component: TestimonialsSection,
} as ComponentMeta<typeof TestimonialsSection>;

const Template: ComponentStory<typeof TestimonialsSection> = (args) => (
  <TestimonialsSection {...args} />
);

export const Default = Template.bind({});
Default.args = {};
