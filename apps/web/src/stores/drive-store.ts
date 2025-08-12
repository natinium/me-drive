import { create } from "zustand";

interface DriveStore {
  // Modal data
  currentFolderId: string | null;
  uploadFiles: File[];

  // Actions
  setUploadFiles: (files: File[]) => void;

  // Reset
  reset: () => void;
}

export const useDriveStore = create<DriveStore>((set) => ({
  // Modal data
  currentFolderId: null,
  uploadFiles: [],

  // Actions
  setUploadFiles: (files: File[]) => set({ uploadFiles: files }),

  // Reset
  reset: () =>
    set({
      currentFolderId: null,
      uploadFiles: [],
    }),
}));
