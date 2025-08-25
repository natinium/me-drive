"use client";

import React from "react";
import { useDriveStore } from "@/stores/drive-store";
import NewFolderModal from "@/components/features/drive/new-folder-modal";
import UploadModal from "@/components/features/drive/upload-modal";

const GlobalModals = () => {
  const {
    isCreateFolderModalOpen,
    isUploadModalOpen,
    currentFolderId,
    closeCreateFolderModal,
    closeUploadModal,
  } = useDriveStore();

  return (
    <>
      <NewFolderModal
        open={isCreateFolderModalOpen}
        onOpenChange={closeCreateFolderModal}
        currentFolderId={currentFolderId}
      />
      <UploadModal
        open={isUploadModalOpen}
        onOpenChange={closeUploadModal}
        currentFolderId={currentFolderId}
      />
    </>
  );
};

export default GlobalModals;
