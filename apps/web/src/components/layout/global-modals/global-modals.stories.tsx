import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import GlobalModals from "./global-modals";
import { useDriveStore } from "@/stores/drive-store";

// Mock store for Storybook
const MockDriveStore = ({ children, state }) => {
  const originalStore = useDriveStore;
  (useDriveStore as any) = () => ({ ...originalStore(), ...state });
  return <>{children}</>;
};

export default {
  title: "Components/Layout/GlobalModals",
  component: GlobalModals,
} as ComponentMeta<typeof GlobalModals>;

const Template: ComponentStory<typeof GlobalModals> = (args) => (
  <MockDriveStore state={args.storeState}>
    <GlobalModals />
    <div>
      <p>Check Chromatic for visual regression testing of the modals.</p>
      <p>Use the controls below to simulate opening them.</p>
    </div>
  </MockDriveStore>
);

export const Default = Template.bind({});
Default.args = {
  storeState: {
    isCreateFolderModalOpen: false,
    isUploadModalOpen: false,
  },
};

export const CreateFolderOpen = Template.bind({});
CreateFolderOpen.args = {
  storeState: {
    isCreateFolderModalOpen: true,
    isUploadModalOpen: false,
  },
};

export const UploadModalOpen = Template.bind({});
UploadModalOpen.args = {
  storeState: {
    isCreateFolderModalOpen: false,
    isUploadModalOpen: true,
  },
};
