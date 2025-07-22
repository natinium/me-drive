import { DriveItem } from "@/app/(dashboard)/my-drive/columns";

// In-memory "database" to simulate backend storage
let mockDb: DriveItem[] = [
  {
    id: "folder1",
    name: "Project Documents",
    type: "folder",
    owner: "me",
    lastModified: new Date("2023-11-20"),
    size: null,
  },
  {
    id: "folder2",
    name: "Vacation Photos",
    type: "folder",
    owner: "me",
    lastModified: new Date("2023-11-18"),
    size: null,
  },
  {
    id: "file1",
    name: "resume_final_v2.pdf",
    type: "file",
    owner: "me",
    lastModified: new Date(),
    size: 1200000,
  },
  {
    id: "file2",
    name: "company-logo.svg",
    type: "file",
    owner: "Bob",
    lastModified: new Date("2023-09-01"),
    size: 15000,
  },
];

const simulateDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// === API FUNCTIONS ===

export const fetchFolderContents = async (
  folderId: string | null,
): Promise<DriveItem[]> => {
  console.log(`API: Fetching contents for folder: ${folderId || "root"}`);
  await simulateDelay(500);
  // In a real app, you'd filter by folderId
  return [...mockDb];
};

export const createFolder = async (
  name: string,
  parentId: string | null,
): Promise<DriveItem> => {
  console.log(`API: Creating folder "${name}" in ${parentId || "root"}`);
  await simulateDelay(500);
  const newFolder: DriveItem = {
    id: `folder_${Date.now()}`,
    name,
    type: "folder",
    owner: "me",
    lastModified: new Date(),
    size: null,
  };
  mockDb.unshift(newFolder); // Add to the top
  return newFolder;
};

export const uploadFile = async (
  file: File,
  parentId: string | null,
): Promise<DriveItem> => {
  console.log(`API: Uploading file "${file.name}" to ${parentId || "root"}`);
  await simulateDelay(1000);
  const newFile: DriveItem = {
    id: `file_${Date.now()}`,
    name: file.name,
    type: "file",
    owner: "me",
    lastModified: new Date(),
    size: file.size,
  };
  mockDb.unshift(newFile);
  return newFile;
};

export const renameItem = async (
  id: string,
  newName: string,
): Promise<DriveItem> => {
  console.log(`API: Renaming item ${id} to "${newName}"`);
  await simulateDelay(500);
  const itemIndex = mockDb.findIndex((item) => item.id === id);
  if (itemIndex === -1) throw new Error("Item not found");

  mockDb[itemIndex].name = newName;
  mockDb[itemIndex].lastModified = new Date();
  return mockDb[itemIndex];
};

export const deleteItem = async (id: string): Promise<{ success: true }> => {
  console.log(`API: Deleting item ${id}`);
  await simulateDelay(500);
  mockDb = mockDb.filter((item) => item.id !== id);
  return { success: true };
};
