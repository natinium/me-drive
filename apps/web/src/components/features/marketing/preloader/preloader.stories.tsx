import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Preloader from "./preloader";

const meta: Meta<typeof Preloader> = {
  title: "Components/Features/Marketing/Preloader",
  component: Preloader,
};

export default meta;
type Story = StoryObj<typeof Preloader>;

export const Default: Story = {
  args: {},
};
