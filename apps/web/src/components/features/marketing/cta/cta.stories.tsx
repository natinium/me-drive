import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import CTA from "./cta";

// Mock next/link for Storybook
jest.mock("next/link", () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} onClick={(e) => e.preventDefault()}>
      {children}
    </a>
  );
  MockLink.displayName = "MockLink";
  return MockLink;
});

export default {
  title: "Components/Features/Marketing/CTA",
  component: CTA,
} as ComponentMeta<typeof CTA>;

const Template: ComponentStory<typeof CTA> = (args) => <CTA {...args} />;

export const Default = Template.bind({});
Default.args = {};
