import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import LoginForm from "./login-form";

export default {
  title: "Components/Features/Auth/LoginForm",
  component: LoginForm,
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => (
  <LoginForm {...args} />
);

export const Default = Template.bind({});
Default.args = {};
