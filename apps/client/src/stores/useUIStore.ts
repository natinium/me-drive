import { create } from "zustand";
import { DriveItem } from "@/app/(dashboard)/my-drive/columns"; // We'll define this type in columns.tsx

type UIState = {
  // State for which dialog is open
  isCreateFolderDialogOpen: boolean;
  isUploadFileDialogOpen: boolean;
  isRenameDialogOpen: boolean;
  isDeleteDialogOpen: boolean;

  // State to hold the item being acted upon
  actionTargetItem: DriveItem | null;

  // Functions to control dialogs
  openCreateFolderDialog: () => void;
  closeCreateFolderDialog: () => void;

  openUploadFileDialog: () => void;
  closeUploadFileDialog: () => void;

  openRenameDialog: (item: DriveItem) => void;
  closeRenameDialog: () => void;

  openDeleteDialog: (item: DriveItem) => void;
  closeDeleteDialog: () => void;
};

export const useUIStore = create<UIState>((set) => ({
  isCreateFolderDialogOpen: false,
  isUploadFileDialogOpen: false,
  isRenameDialogOpen: false,
  isDeleteDialogOpen: false,
  actionTargetItem: null,

  openCreateFolderDialog: () => set({ isCreateFolderDialogOpen: true }),
  closeCreateFolderDialog: () =>
    set({ isCreateFolderDialogOpen: false, actionTargetItem: null }),

  openUploadFileDialog: () => set({ isUploadFileDialogOpen: true }),
  closeUploadFileDialog: () =>
    set({ isUploadFileDialogOpen: false, actionTargetItem: null }),

  openRenameDialog: (item) =>
    set({ isRenameDialogOpen: true, actionTargetItem: item }),
  closeRenameDialog: () =>
    set({ isRenameDialogOpen: false, actionTargetItem: null }),

  openDeleteDialog: (item) =>
    set({ isDeleteDialogOpen: true, actionTargetItem: item }),
  closeDeleteDialog: () =>
    set({ isDeleteDialogOpen: false, actionTargetItem: null }),
}));
