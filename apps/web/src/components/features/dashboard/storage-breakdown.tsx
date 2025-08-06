import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileText, Image, Video, Archive, Folder } from "lucide-react";

interface StorageCategory {
  label: string;
  used: number;
  color: string;
  icon: React.ReactNode;
}

interface StorageBreakdownProps {
  categories?: StorageCategory[];
  title?: string;
  description?: string;
}

export const StorageBreakdown = ({
  categories,
  title = "Storage Breakdown",
  description = "How your storage is being used",
}: StorageBreakdownProps) => {
  const defaultCategories: StorageCategory[] = [
    {
      label: "Documents",
      used: 15.2,
      color: "bg-blue-500",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      label: "Images",
      used: 12.8,
      color: "bg-green-500",
      icon: <Image className="h-4 w-4" />,
    },
    {
      label: "Videos",
      used: 10.5,
      color: "bg-purple-500",
      icon: <Video className="h-4 w-4" />,
    },
    {
      label: "Archives",
      used: 6.7,
      color: "bg-orange-500",
      icon: <Archive className="h-4 w-4" />,
    },
    {
      label: "Others",
      used: 2.1,
      color: "bg-gray-500",
      icon: <Folder className="h-4 w-4" />,
    },
  ];

  const finalCategories = categories || defaultCategories;
  const totalUsed = finalCategories.reduce((sum, cat) => sum + cat.used, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {finalCategories.map((category) => (
            <div key={category.label} className="space-y-2">
              <div className="flex justify-between text-sm">
                <div className="flex items-center gap-2">
                  {category.icon}
                  <span className="font-medium">{category.label}</span>
                </div>
                <span className="text-muted-foreground">
                  {category.used} GB
                </span>
              </div>
              <Progress
                value={(category.used / totalUsed) * 100}
                className={category.color}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t">
          <div className="flex justify-between text-sm font-medium">
            <span>Total Used</span>
            <span>{totalUsed.toFixed(1)} GB</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
