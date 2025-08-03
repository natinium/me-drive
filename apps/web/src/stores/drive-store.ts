import { create } from "zustand";

interface DriveStore {
  // Modal states
  isCreateFolderModalOpen: boolean;
  isUploadModalOpen: boolean;

  // Modal data
  currentFolderId: string | null;
  uploadFiles: File[];

  // Actions
  openCreateFolderModal: (folderId?: string | null) => void;
  closeCreateFolderModal: () => void;
  openUploadModal: (folderId?: string | null) => void;
  closeUploadModal: () => void;
  setUploadFiles: (files: File[]) => void;

  // Reset
  reset: () => void;
}

export const useDriveStore = create<DriveStore>((set) => ({
  // Modal states
  isCreateFolderModalOpen: false,
  isUploadModalOpen: false,

  // Modal data
  currentFolderId: null,
  uploadFiles: [],

  // Actions
  openCreateFolderModal: (folderId = null) =>
    set({
      isCreateFolderModalOpen: true,
      currentFolderId: folderId,
    }),
  closeCreateFolderModal: () =>
    set({
      isCreateFolderModalOpen: false,
      currentFolderId: null,
    }),

  openUploadModal: (folderId = null) =>
    set({
      isUploadModalOpen: true,
      currentFolderId: folderId,
    }),
  closeUploadModal: () =>
    set({
      isUploadModalOpen: false,
      currentFolderId: null,
      uploadFiles: [],
    }),

  setUploadFiles: (files: File[]) => set({ uploadFiles: files }),

  // Reset
  reset: () =>
    set({
      isCreateFolderModalOpen: false,
      isUploadModalOpen: false,
      currentFolderId: null,
      uploadFiles: [],
    }),
}));
