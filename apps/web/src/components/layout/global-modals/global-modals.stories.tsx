import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import GlobalModals from "./global-modals";
import { useDriveStore } from "@/stores/drive-store";

// Mock store for Storybook
const MockDriveStore = ({
  children,
  state,
}: {
  children: React.ReactNode;
  state: any;
}) => {
  const originalStore = useDriveStore;
  (useDriveStore as any) = () => ({ ...originalStore(), ...state });
  return <>{children}</>;
};

const meta: Meta<typeof GlobalModals> = {
  title: "Components/Layout/GlobalModals",
  component: GlobalModals,
};

export default meta;
type Story = StoryObj<typeof GlobalModals>;

export const Default: Story = {
  args: {
    storeState: {
      isCreateFolderModalOpen: false,
      isUploadModalOpen: false,
    },
  },
  render: (args: any) => (
    <MockDriveStore state={args.storeState}>
      <GlobalModals />
      <div>
        <p>Check Chromatic for visual regression testing of the modals.</p>
        <p>Use the controls below to simulate opening them.</p>
      </div>
    </MockDriveStore>
  ),
};

export const CreateFolderOpen: Story = {
  args: {
    storeState: {
      isCreateFolderModalOpen: true,
      isUploadModalOpen: false,
    },
  },
  render: (args: any) => (
    <MockDriveStore state={args.storeState}>
      <GlobalModals />
    </MockDriveStore>
  ),
};

export const UploadModalOpen: Story = {
  args: {
    storeState: {
      isCreateFolderModalOpen: false,
      isUploadModalOpen: true,
    },
  },
  render: (args: any) => (
    <MockDriveStore state={args.storeState}>
      <GlobalModals />
    </MockDriveStore>
  ),
};
