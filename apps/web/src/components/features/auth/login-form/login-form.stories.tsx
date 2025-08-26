import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import LoginForm from "./login-form";

const meta: Meta<typeof LoginForm> = {
  title: "Components/Features/Auth/LoginForm",
  component: LoginForm,
};

export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: {},
};
