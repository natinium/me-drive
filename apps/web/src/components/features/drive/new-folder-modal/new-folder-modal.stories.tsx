import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import NewFolderModal from "./new-folder-modal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock hooks and functions for Storybook
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: { accessToken: "mock-token" },
    status: "authenticated",
  })),
}));

jest.mock("@/lib/api", () => ({
  createFolder: jest.fn((token, data) => {
    console.log("Mock createFolder called with:", token, data);
    return Promise.resolve({});
  }),
}));

jest.mock("sonner", () => ({
  toast: {
    success: (message: string) => console.log("Toast Success:", message),
    error: (message: string) => console.error("Toast Error:", message),
  },
}));

const queryClient = new QueryClient();

const meta: Meta<typeof NewFolderModal> = {
  title: "Components/Features/Drive/NewFolderModal",
  component: NewFolderModal,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NewFolderModal>;

export const Default: Story = {
  args: {
    open: true,
    onOpenChange: (open) => console.log("Modal open state changed:", open),
    currentFolderId: "root",
  },
};

export const Closed: Story = {
  args: {
    open: false,
    onOpenChange: (open) => console.log("Modal open state changed:", open),
    currentFolderId: "root",
  },
};

export const CreatingState: Story = {
  args: {
    ...Default.args,
    // Simulate creating state by making createFolder return a pending promise
    // This requires more advanced mocking or a custom decorator if you want to show it live
    // For now, it will just show the default button text.
  },
};
