import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import SignupForm from "./signup-form";

// Mock react-dom's useFormState and useFormStatus for Storybook
jest.mock("react-dom", () => ({
  useFormState: jest.fn((action, initialState) => [
    initialState,
    jest.fn(), // Mock dispatch function
  ]),
  useFormStatus: jest.fn(() => ({ pending: false })),
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

// Mock the action
jest.mock("@/actions/auth.actions", () => ({
  signUpAction: jest.fn(),
}));

const meta: Meta<typeof SignupForm> = {
  title: "Components/Features/Auth/SignupForm",
  component: SignupForm,
};

export default meta;
type Story = StoryObj<typeof SignupForm>;

export const Default: Story = {
  args: {},
};
