import { create } from "zustand";

interface DriveStore {
  // Modal state
  isCreateFolderModalOpen: boolean;
  isUploadModalOpen: boolean;

  // Modal data
  currentFolderId: string | null;
  uploadFiles: File[];

  // Actions
  openCreateFolderModal: (folderId?: string) => void;
  closeCreateFolderModal: () => void;
  openUploadModal: (folderId?: string) => void;
  closeUploadModal: () => void;
  setUploadFiles: (files: File[]) => void;

  // Reset
  reset: () => void;
}

export const useDriveStore = create<DriveStore>((set) => ({
  // Modal state
  isCreateFolderModalOpen: false,
  isUploadModalOpen: false,

  // Modal data
  currentFolderId: null,
  uploadFiles: [],

  // Actions
  openCreateFolderModal: (folderId?: string) =>
    set({
      isCreateFolderModalOpen: true,
      currentFolderId: folderId || null,
    }),
  closeCreateFolderModal: () =>
    set({
      isCreateFolderModalOpen: false,
      currentFolderId: null,
    }),
  openUploadModal: (folderId?: string) =>
    set({
      isUploadModalOpen: true,
      currentFolderId: folderId || null,
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
