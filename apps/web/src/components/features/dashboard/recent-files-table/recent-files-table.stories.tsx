import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RecentFilesTable from "./recent-files-table";
import type { DriveFile } from "@/types/drive";

const mockFiles: DriveFile[] = [
  {
    id: "1",
    name: "Annual-Report.pdf",
    type: "application/pdf",
    size: 1572864,
    url: "https://example.com/files/1",
    folderId: null,
    isShared: false,
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    itemType: "file",
  },
  {
    id: "2",
    name: "Company-Headshots.zip",
    type: "application/zip",
    size: 26214400,
    url: "https://example.com/files/2",
    folderId: null,
    isShared: true,
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(), // 1 week ago
    updatedAt: new Date(Date.now() - 86400000 * 7).toISOString(), // 1 week ago
    itemType: "file",
  },
  {
    id: "3",
    name: "Product-Demo.mp4",
    type: "video/mp4",
    size: 134217728,
    url: "https://example.com/files/3",
    folderId: null,
    isShared: false,
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(), // 2 weeks ago
    updatedAt: new Date(Date.now() - 86400000 * 14).toISOString(), // 2 weeks ago
    itemType: "file",
  },
];

const meta: Meta<typeof RecentFilesTable> = {
  title: "Components/Features/Dashboard/RecentFilesTable",
  component: RecentFilesTable,
};

export default meta;
type Story = StoryObj<typeof RecentFilesTable>;

export const Default: Story = {
  args: {
    files: mockFiles,
  },
};

export const Empty: Story = {
  args: {
    files: [],
    title: "No Files Here",
    description: "There are no files to display at the moment.",
  },
};

export const CustomTitle: Story = {
  args: {
    files: mockFiles.slice(0, 1),
    title: "Important Documents",
    description: "Just the most important stuff.",
  },
};
