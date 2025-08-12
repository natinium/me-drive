"use client";

import React, { useEffect, useState } from "react";
import {
  DashboardStats,
  RecentFilesTable,
  StorageBreakdown,
} from "@/components/features/dashboard";
import { toast } from "sonner";
import { getDashboardStats } from "@/lib/api";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<{
    totalFiles: number;
    totalFolders: number;
    storageUsed: number;
    storageLimit: number;
    recentFiles: any[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        if (!session?.accessToken) return;
        const s = await getDashboardStats(session.accessToken as string);
        setStats(s);
      } catch (e: any) {
        toast.error(e?.message || "Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [session?.accessToken]);

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

      {stats && (
        <DashboardStats
          totalFiles={stats.totalFiles}
          totalFolders={stats.totalFolders}
          storageUsed={`${(Number(stats.storageUsed) / (1024 * 1024 * 1024)).toFixed(1)} GB`}
          storageTotal={`${(Number(stats.storageLimit) / (1024 * 1024 * 1024)).toFixed(1)} GB`}
          storagePercentage={Math.round(
            (Number(stats.storageUsed) / Number(stats.storageLimit)) * 100,
          )}
        />
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentFilesTable files={stats?.recentFiles ?? []} />
        </div>
        <div className="lg:col-span-1">
          <StorageBreakdown />
        </div>
      </div>
    </div>
  );
}
