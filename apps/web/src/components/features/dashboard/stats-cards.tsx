import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { File, Folder, HardDrive, Users, Activity } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  trend?: string;
  progress?: number;
  className?: string;
}

export const StatsCard = ({
  title,
  value,
  description,
  icon,
  trend,
  progress,
  className,
}: StatsCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend) && (
          <p className="text-xs text-muted-foreground">
            {description}
            {trend && <span className="ml-1">{trend}</span>}
          </p>
        )}
        {progress !== undefined && (
          <Progress value={progress} className="mt-2" />
        )}
      </CardContent>
    </Card>
  );
};

interface DashboardStatsProps {
  totalFiles?: number;
  totalFolders?: number;
  storageUsed?: string;
  storageTotal?: string;
  storagePercentage?: number;
  sharedItems?: number;
  recentActivity?: number;
}

export const DashboardStats = ({
  totalFiles = 0,
  totalFolders = 0,
  storageUsed = "0 GB",
  storageTotal = "100 GB",
  storagePercentage = 0,
  sharedItems = 0,
  recentActivity = 0,
}: DashboardStatsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Files"
        value={totalFiles}
        icon={<File className="h-4 w-4 text-muted-foreground" />}
        trend="+12 from last week"
      />
      <StatsCard
        title="Total Folders"
        value={totalFolders}
        icon={<Folder className="h-4 w-4 text-muted-foreground" />}
        trend="+3 from last week"
      />
      <StatsCard
        title="Storage Used"
        value={storageUsed}
        description={`of ${storageTotal}`}
        icon={<HardDrive className="h-4 w-4 text-muted-foreground" />}
      />
      <StatsCard
        title="Storage Usage"
        value={`${storagePercentage}%`}
        progress={storagePercentage}
        icon={<Activity className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
};
