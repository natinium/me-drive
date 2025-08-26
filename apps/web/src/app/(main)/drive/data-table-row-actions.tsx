"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Download, Trash2, Share2, Edit } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DriveFile, DriveFolder } from "@/types/drive";
import {
  deleteFile,
  deleteFolder,
  downloadFile,
  renameFile,
  renameFolder,
} from "@/lib/api";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const item = row.original as DriveFile | DriveFolder;
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (item: DriveFile | DriveFolder) => {
      const token = session!.accessToken as string;
      return item.itemType === "folder"
        ? deleteFolder(token, item.id)
        : deleteFile(token, item.id);
    },
    onSuccess: () => {
      toast.success("Deleted");
      queryClient.invalidateQueries({
        queryKey: [
          "driveItems",
          item.itemType === "folder" ? item.parentId : item.folderId,
        ],
      });
    },
    onError: (e: Error) => toast.error(e.message || "Delete failed"),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {item.itemType === "file" && (
          <DropdownMenuItem
            onClick={() =>
              downloadFile(session!.accessToken as string, item.id, item.name)
            }
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={() => console.log("Rename")}>
          <Edit className="mr-2 h-4 w-4" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => console.log("Share")}>
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onClick={() => deleteMutation.mutate(item)}
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
