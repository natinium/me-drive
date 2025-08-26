import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import FAQSection from "./faq-section";

const meta: Meta<typeof FAQSection> = {
  title: "Components/Features/Marketing/FAQSection",
  component: FAQSection,
};

export default meta;
type Story = StoryObj<typeof FAQSection>;

export const Default: Story = {
  args: {},
};
