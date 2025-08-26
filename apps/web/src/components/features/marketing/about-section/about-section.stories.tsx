import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import AboutSection from "./about-section";

const meta: Meta<typeof AboutSection> = {
  title: "Components/Features/Marketing/AboutSection",
  component: AboutSection,
};

export default meta;
type Story = StoryObj<typeof AboutSection>;

export const Default: Story = {
  args: {},
};
