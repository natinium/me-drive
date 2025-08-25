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
import { Badge } from "@/components/ui/badge";
import { FileText, Image, Video, Archive, File } from "lucide-react";
import type { DriveFile } from "@/types/drive";
import styles from "./recent-files-table.module.css";

interface RecentFilesTableProps {
  files: DriveFile[];
  title?: string;
  description?: string;
}

const RecentFilesTable = ({
  files,
  title = "Recent Files",
  description = "Your most recently accessed files",
}: RecentFilesTableProps) => {
  const getFileIcon = (mimeType: string) => {
    switch (mimeType) {
      case "application/pdf":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "image/jpeg":
      case "image/png":
      case "image/gif":
        return <Image className="h-4 w-4 text-green-500" />;
      case "video/mp4":
      case "video/quicktime":
        return <Video className="h-4 w-4 text-purple-500" />;
      case "application/zip":
      case "application/x-rar-compressed":
        return <Archive className="h-4 w-4 text-orange-500" />;
      default:
        return <File className="h-4 w-4 text-gray-500" />;
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {files.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <File className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p>No recent files</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Modified</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file) => (
                <TableRow key={file.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {getFileIcon(
                      (file as any).mimeType ||
                        (file as any).type ||
                        "unknown/unknown",
                    )}
                    {file.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {(
                        (file as any).mimeType ||
                        (file as any).type ||
                        "unknown/unknown"
                      )
                        .split("/")[1]
                        ?.toUpperCase() || "FILE"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatFileSize(file.size)}</TableCell>
                  <TableCell>{formatDate(file.updatedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentFilesTable;
