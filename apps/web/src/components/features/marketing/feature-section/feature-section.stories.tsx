import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import FeatureSection from "./feature-section";

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
  title: "Components/Features/Marketing/FeatureSection",
  component: FeatureSection,
} as ComponentMeta<typeof FeatureSection>;

const Template: ComponentStory<typeof FeatureSection> = (args) => (
  <FeatureSection {...args} />
);

export const Default = Template.bind({});
Default.args = {};
