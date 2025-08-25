import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AuthHeader from "./auth-header";

// Mock the Logo component for Storybook
jest.mock("@/components/ui/logo", () => ({
  Logo: (props: any) => (
    <div {...props} style={{ border: "1px solid gray", padding: "5px" }}>
      Mock Logo
    </div>
  ),
}));

export default {
  title: "Components/Features/Auth/AuthHeader",
  component: AuthHeader,
} as ComponentMeta<typeof AuthHeader>;

const Template: ComponentStory<typeof AuthHeader> = (args) => (
  <AuthHeader {...args} />
);

export const Default = Template.bind({});
Default.args = {};
