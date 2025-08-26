import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import TestimonialsSection from "./testimonials-section";

const meta: Meta<typeof TestimonialsSection> = {
  title: "Components/Features/Marketing/TestimonialsSection",
  component: TestimonialsSection,
};

export default meta;
type Story = StoryObj<typeof TestimonialsSection>;

export const Default: Story = {
  args: {},
};
