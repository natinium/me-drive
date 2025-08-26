import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import ContactSection from "./contact-section";

const meta: Meta<typeof ContactSection> = {
  title: "Components/Features/Marketing/ContactSection",
  component: ContactSection,
};

export default meta;
type Story = StoryObj<typeof ContactSection>;

export const Default: Story = {
  args: {},
};
