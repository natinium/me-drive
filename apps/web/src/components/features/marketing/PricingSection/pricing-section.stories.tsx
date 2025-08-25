import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import PricingSection from "./pricing-section";

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
  title: "Components/Features/Marketing/PricingSection",
  component: PricingSection,
} as ComponentMeta<typeof PricingSection>;

const Template: ComponentStory<typeof PricingSection> = (args) => (
  <PricingSection {...args} />
);

export const Default = Template.bind({});
Default.args = {};
