"use client";

import React from "react";
import {
  DashboardStats,
  RecentFilesTable,
  StorageBreakdown,
} from "@/components/features/dashboard";
import { toast } from "sonner";
import { dashboardStats, recentActivities } from "./data";

export default function DashboardPage() {
  // For now, use empty array as we don't have actual DriveFile objects
  // In a real app, this would come from the API
  const recentFiles = dashboardStats.recentFiles;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your storage.
        </p>
      </header>

      <DashboardStats
        totalFiles={dashboardStats.totalFiles}
        totalFolders={dashboardStats.totalFolders}
        storageUsed={`${(dashboardStats.storageUsed / (1024 * 1024 * 1024)).toFixed(1)} GB`}
        storageTotal={`${(dashboardStats.storageLimit / (1024 * 1024 * 1024)).toFixed(1)} GB`}
        storagePercentage={Math.round(
          (dashboardStats.storageUsed / dashboardStats.storageLimit) * 100,
        )}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentFilesTable files={recentFiles} />
        </div>
        <div className="lg:col-span-1">
          <StorageBreakdown />
        </div>
      </div>
    </div>
  );
}
