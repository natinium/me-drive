"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Folder, File, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { useUIStore } from "@/stores/useUIStore";

export type DriveItem = {
  id: string;
  name: string;
  type: "folder" | "file";
  owner: string;
  lastModified: Date;
  size: number | null;
};

export const columns: ColumnDef<DriveItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
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
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center gap-2">
          {item.type === "folder" ? (
            <Folder className="h-4 w-4 text-blue-500" />
          ) : (
            <File className="h-4 w-4 text-gray-500" />
          )}
          <span className="font-medium">{item.name}</span>
        </div>
      );
    },
  },
  { accessorKey: "owner", header: "Owner" },
  {
    accessorKey: "lastModified",
    header: "Last Modified",
    cell: ({ row }) => (
      <span>{format(new Date(row.original.lastModified), "PPp")}</span>
    ),
  },
  {
    accessorKey: "size",
    header: "File Size",
    cell: ({ row }) => {
      const { size, type } = row.original;
      if (type === "folder" || size === null) return "—";
      if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
      return `${(size / 1024 / 1024).toFixed(1)} MB`;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original;
      const { openRenameDialog, openDeleteDialog } = useUIStore.getState();

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(item.id)}
            >
              Copy ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => openRenameDialog(item)}>
              Rename
            </DropdownMenuItem>
            {item.type === "file" && (
              <DropdownMenuItem>Download</DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-500 focus:text-red-500"
              onClick={() => openDeleteDialog(item)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
