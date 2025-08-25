"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDriveStore } from "@/stores/drive-store";
import { useSession } from "next-auth/react";
import { createFolder } from "@/lib/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import styles from "./new-folder-modal.module.css";

const NewFolderModal = ({
  open,
  onOpenChange,
  currentFolderId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentFolderId?: string | null;
}) => {
  // Remove useDriveStore for open state
  // const { isCreateFolderModalOpen, closeCreateFolderModal } = useDriveStore();
  const [folderName, setFolderName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const handleCreateFolder = async () => {
    console.log("handleCreateFolder called"); // Added log
    if (!folderName.trim()) {
      toast.error("Folder name cannot be empty");
      return;
    }
    if (!session?.accessToken) {
      toast.error("Authentication error");
      return;
    }

    setIsCreating(true);
    try {
      await createFolder(session.accessToken, {
        name: folderName,
        parentId: currentFolderId,
      });
      toast.success(`Folder "${folderName}" created`);
      queryClient.invalidateQueries({
        queryKey: ["driveItems", currentFolderId, session?.accessToken],
      });
      onOpenChange(false); // Use onOpenChange to close
      setFolderName("");
    } catch (error: any) {
      toast.error(error.message || "Failed to create folder");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog
      open={open} // Use open prop
      onOpenChange={onOpenChange} // Use onOpenChange prop
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Folder</DialogTitle>
          <DialogDescription>
            Enter a name for your new folder.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            id="folder-name"
            placeholder="Folder name"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            disabled={isCreating}
          />
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateFolder} disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Folder"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewFolderModal;
