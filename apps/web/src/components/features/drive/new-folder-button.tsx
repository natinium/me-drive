"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Folder, Plus } from "lucide-react";
import { useDriveStore } from "@/stores/drive-store";
import { toast } from "sonner";

export function NewFolderButton({ folderId }: { folderId?: string }) {
  const {
    isCreateFolderModalOpen,
    currentFolderId,
    openCreateFolderModal,
    closeCreateFolderModal,
  } = useDriveStore();

  const [folderName, setFolderName] = useState("");

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      const targetFolderId = folderId || currentFolderId;
      toast.success(
        `Folder "${folderName}" created successfully in ${targetFolderId ? "current folder" : "root"}`,
      );
      setFolderName("");
      closeCreateFolderModal();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && folderName.trim()) {
      handleCreateFolder();
    }
  };

  return (
    <Dialog
      open={isCreateFolderModalOpen}
      onOpenChange={closeCreateFolderModal}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Folder</DialogTitle>
          <DialogDescription>
            Enter a name for your new folder.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="folder-name">Folder Name</Label>
            <Input
              id="folder-name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="My New Folder"
              autoFocus
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeCreateFolderModal}>
            Cancel
          </Button>
          <Button onClick={handleCreateFolder} disabled={!folderName.trim()}>
            Create Folder
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
