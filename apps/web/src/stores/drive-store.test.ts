import { renderHook, act } from "@testing-library/react";
import { useDriveStore } from "./drive-store";

// Reset store before each test
const resetStore = () => {
  useDriveStore.setState({
    isCreateFolderModalOpen: false,
    isUploadModalOpen: false,
    currentFolderId: null,
    uploadFiles: [],
  });
};

describe("useDriveStore", () => {
  beforeEach(() => {
    resetStore();
  });

  describe("modal state management", () => {
    it("should initialize with default values", () => {
      const { result } = renderHook(() => useDriveStore());

      expect(result.current.isCreateFolderModalOpen).toBe(false);
      expect(result.current.isUploadModalOpen).toBe(false);
      expect(result.current.currentFolderId).toBe(null);
      expect(result.current.uploadFiles).toEqual([]);
    });

    it("should open create folder modal", () => {
      const { result } = renderHook(() => useDriveStore());

      act(() => {
        result.current.openCreateFolderModal();
      });

      expect(result.current.isCreateFolderModalOpen).toBe(true);
      expect(result.current.currentFolderId).toBe(null);
    });

    it("should open create folder modal with folder ID", () => {
      const { result } = renderHook(() => useDriveStore());
      const folderId = "test-folder-id";

      act(() => {
        result.current.openCreateFolderModal(folderId);
      });

      expect(result.current.isCreateFolderModalOpen).toBe(true);
      expect(result.current.currentFolderId).toBe(folderId);
    });

    it("should close create folder modal", () => {
      const { result } = renderHook(() => useDriveStore());

      act(() => {
        result.current.openCreateFolderModal();
      });

      act(() => {
        result.current.closeCreateFolderModal();
      });

      expect(result.current.isCreateFolderModalOpen).toBe(false);
      expect(result.current.currentFolderId).toBe(null);
    });

    it("should open upload modal", () => {
      const { result } = renderHook(() => useDriveStore());

      act(() => {
        result.current.openUploadModal();
      });

      expect(result.current.isUploadModalOpen).toBe(true);
      expect(result.current.currentFolderId).toBe(null);
    });

    it("should open upload modal with folder ID", () => {
      const { result } = renderHook(() => useDriveStore());
      const folderId = "test-folder-id";

      act(() => {
        result.current.openUploadModal(folderId);
      });

      expect(result.current.isUploadModalOpen).toBe(true);
      expect(result.current.currentFolderId).toBe(folderId);
    });

    it("should close upload modal and reset files", () => {
      const { result } = renderHook(() => useDriveStore());
      const testFiles = [new File(["test"], "test.txt")];

      act(() => {
        result.current.openUploadModal();
        result.current.setUploadFiles(testFiles);
      });

      act(() => {
        result.current.closeUploadModal();
      });

      expect(result.current.isUploadModalOpen).toBe(false);
      expect(result.current.currentFolderId).toBe(null);
      expect(result.current.uploadFiles).toEqual([]);
    });
  });

  describe("file management", () => {
    it("should set upload files", () => {
      const { result } = renderHook(() => useDriveStore());
      const testFiles = [
        new File(["test"], "test.txt"),
        new File(["test2"], "test2.txt"),
      ];

      act(() => {
        result.current.setUploadFiles(testFiles);
      });

      expect(result.current.uploadFiles).toEqual(testFiles);
    });
  });

  describe("reset functionality", () => {
    it("should reset all state", () => {
      const { result } = renderHook(() => useDriveStore());

      act(() => {
        result.current.openCreateFolderModal("folder-id");
        result.current.openUploadModal("upload-folder-id");
        result.current.setUploadFiles([new File(["test"], "test.txt")]);
      });

      act(() => {
        result.current.reset();
      });

      expect(result.current.isCreateFolderModalOpen).toBe(false);
      expect(result.current.isUploadModalOpen).toBe(false);
      expect(result.current.currentFolderId).toBe(null);
      expect(result.current.uploadFiles).toEqual([]);
    });
  });
});
