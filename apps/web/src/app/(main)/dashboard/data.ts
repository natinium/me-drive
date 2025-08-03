import type { DashboardStats, RecentActivity } from "@/types/drive";

// Mock dashboard data updated to match API structure
export const dashboardStats: DashboardStats = {
  totalFiles: 394,
  totalFolders: 25,
  storageUsed: 52428800000, // 52.4 GB in bytes
  storageLimit: 102400000000, // 102.4 GB in bytes
  recentFiles: [], // This should be populated with actual DriveFile objects
};

export const recentActivities: RecentActivity[] = [
  {
    id: "1",
    type: "upload",
    itemName: "presentation.pptx",
    itemType: "file",
    timestamp: "2024-01-15T08:30:00.000Z",
    user: "John Doe",
    action: "uploaded",
  },
  {
    id: "2",
    type: "share",
    itemName: "project-report.pdf",
    itemType: "file",
    timestamp: "2024-01-14T14:20:00.000Z",
    user: "Jane Smith",
    action: "shared",
  },
  {
    id: "3",
    type: "upload",
    itemName: "Work Projects",
    itemType: "folder",
    timestamp: "2024-01-12T16:45:00.000Z",
    user: "John Doe",
    action: "created",
  },
  {
    id: "4",
    type: "upload",
    itemName: "team-photo.jpg",
    itemType: "file",
    timestamp: "2024-01-13T11:15:00.000Z",
    user: "Mike Wilson",
    action: "uploaded",
  },
  {
    id: "5",
    type: "upload",
    itemName: "meeting-recording.mp4",
    itemType: "file",
    timestamp: "2024-01-12T09:00:00.000Z",
    user: "John Doe",
    action: "uploaded",
  },
];
