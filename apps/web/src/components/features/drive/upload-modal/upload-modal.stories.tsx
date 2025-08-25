import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import UploadModal from "./upload-modal";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Mock hooks and functions for Storybook
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(() => ({
    data: { accessToken: "mock-token" },
    status: "authenticated",
  })),
}));

jest.mock("@/lib/api", () => ({
  uploadFile: jest.fn((token, data) => {
    console.log("Mock uploadFile called with:", token, data);
    return Promise.resolve({});
  }),
}));

jest.mock("sonner", () => ({
  toast: {
    success: (message: string) => console.log("Toast Success:", message),
    error: (message: string) => console.error("Toast Error:", message),
  },
}));

jest.mock("react-dropzone", () => ({
  useDropzone: jest.fn(() => ({
    getRootProps: () => ({}),
    getInputProps: () => ({}),
    isDragActive: false,
  })),
}));

const queryClient = new QueryClient();

export default {
  title: "Components/Features/Drive/UploadModal",
  component: UploadModal,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as ComponentMeta<typeof UploadModal>;

const Template: ComponentStory<typeof UploadModal> = (args) => (
  <UploadModal {...args} />
);

export const Default = Template.bind({});
Default.args = {
  open: true,
  onOpenChange: (open) => console.log("Modal open state changed:", open),
  currentFolderId: "root",
};

export const Closed = Template.bind({});
Closed.args = {
  open: false,
  onOpenChange: (open) => console.log("Modal open state changed:", open),
  currentFolderId: "root",
};
