"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DriveFile, DriveFolder } from "@/types/drive";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Folder, FileText, Image, Video, Archive, Star } from "lucide-react";

const formatFileSize = (bytes: number) => {
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  if (!bytes) return "0 B";
  const i = Math.floor((bytes === 0 ? 0 : Math.log(bytes)) / Math.log(1024));
  return `${Math.round((bytes / 1024 ** i) * 100) / 100} ${sizes[i]}`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86_400_000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return date.toLocaleDateString();
};

const getFileIcon = (item: DriveFile | DriveFolder) => {
  if (item.itemType === "folder")
    return <Folder className="h-4 w-4 text-blue-500" />;
  switch ((item as DriveFile).type) {
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
      return <FileText className="h-4 w-4 text-gray-500" />;
  }
};

export const columns: ColumnDef<DriveFile | DriveFolder>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center gap-2">
          {getFileIcon(item)}
          <span className="font-medium">{item.name}</span>
          {item.itemType === "file" && (item as DriveFile).isShared && (
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const item = row.original;
      const type =
        item.itemType === "folder"
          ? "Folder"
          : (item as DriveFile).type.split("/")[1]?.toUpperCase() || "FILE";
      return (
        <Badge variant={item.itemType === "folder" ? "outline" : "secondary"}>
          {type}
        </Badge>
      );
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => {
      const size =
        row.original.itemType === "file"
          ? (row.original as DriveFile).size
          : undefined;
      return (
        <span className="text-sm text-muted-foreground">
          {size ? formatFileSize(size) : "—"}
        </span>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Modified",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDate(row.original.updatedAt)}
      </span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
