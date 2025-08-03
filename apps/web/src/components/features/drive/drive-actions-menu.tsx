"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Folder, Upload, Plus } from "lucide-react";
import { useDriveStore } from "@/stores/drive-store";

export function DriveActionsMenu({ folderId }: { folderId?: string }) {
  const { openCreateFolderModal, openUploadModal } = useDriveStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => openCreateFolderModal(folderId)}>
          <Folder className="mr-2 h-4 w-4" />
          New Folder
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openUploadModal(folderId)}>
          <Upload className="mr-2 h-4 w-4" />
          Upload File
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
