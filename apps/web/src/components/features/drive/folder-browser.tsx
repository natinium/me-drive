"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Folder,
  File,
  FileText,
  Image,
  Video,
  Archive,
  MoreHorizontal,
  Download,
  Trash2,
  Share2,
  Edit,
  Star,
  FolderOpen,
} from "lucide-react";
import type { DriveFile, DriveFolder } from "@/types/drive";

interface FolderBrowserProps {
  items: (DriveFile | DriveFolder)[];
  onItemClick?: (item: DriveFile | DriveFolder) => void;
  onItemAction?: (action: string, item: DriveFile | DriveFolder) => void;
  showActions?: boolean;
  title?: string;
  description?: string;
}

export const FolderBrowser = ({
  items = [],
  onItemClick,
  onItemAction,
  showActions = true,
  title = "Files and Folders",
  description,
}: FolderBrowserProps) => {
  const getFileIcon = (item: DriveFile | DriveFolder) => {
    if (item.type === "folder") {
      return <Folder className="h-5 w-5 text-blue-500" />;
    }

    const file = item as DriveFile;
    switch (file.mimeType) {
      case "application/pdf":
        return <FileText className="h-5 w-5 text-red-500" />;
      case "image/jpeg":
      case "image/png":
      case "image/gif":
        return <Image className="h-5 w-5 text-green-500" />;
      case "video/mp4":
      case "video/quicktime":
        return <Video className="h-5 w-5 text-purple-500" />;
      case "application/zip":
      case "application/x-rar-compressed":
        return <Archive className="h-5 w-5 text-orange-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number): string => {
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 B";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round((bytes / Math.pow(1024, i)) * 100) / 100} ${sizes[i]}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const handleItemClick = (item: DriveFile | DriveFolder) => {
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const handleAction = (action: string, item: DriveFile | DriveFolder) => {
    if (onItemAction) {
      onItemAction(action, item);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        {!description && (
          <CardDescription>
            {items.length} items •{" "}
            {items.filter((item) => item.type === "folder").length} folders,{" "}
            {items.filter((item) => item.type === "file").length} files
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Folder className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No files or folders found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Modified</TableHead>
                <TableHead>Shared</TableHead>
                {showActions && (
                  <TableHead className="text-right">Actions</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow
                  key={item.id}
                  className="group cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      {getFileIcon(item)}
                      <span
                        className={
                          item.type === "folder" ? "font-semibold" : ""
                        }
                      >
                        {item.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.type === "folder" ? (
                      <Badge variant="outline">Folder</Badge>
                    ) : (
                      <Badge variant="secondary">
                        {(item as DriveFile).mimeType
                          .split("/")[1]
                          .toUpperCase()}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.type === "file"
                      ? formatFileSize((item as DriveFile).size)
                      : "—"}
                  </TableCell>
                  <TableCell>{formatDate(item.updatedAt)}</TableCell>
                  <TableCell>
                    {item.type === "file" && (item as DriveFile).isShared && (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700"
                      >
                        Shared
                      </Badge>
                    )}
                  </TableCell>
                  {showActions && (
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleAction("download", item)}
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleAction("share", item)}
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleAction("rename", item)}
                          >
                            <Edit className="h-4 w-4 mr-2" />
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleAction("delete", item)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};
