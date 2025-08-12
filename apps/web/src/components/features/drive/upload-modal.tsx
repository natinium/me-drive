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
import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useDriveStore } from "@/stores/drive-store";
import { useSession } from "next-auth/react";
import { uploadFile } from "@/lib/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export const UploadModal = ({
  open,
  onOpenChange,
  currentFolderId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentFolderId?: string | null;
}) => {
  // Remove useDriveStore for open state
  // const { isUploadModalOpen, closeUploadModal } = useDriveStore();
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleUpload = async () => {
    console.log("handleUpload called"); // Added log
    if (files.length === 0) {
      toast.error("Please select at least one file to upload");
      return;
    }
    if (!session?.accessToken) {
      toast.error("Authentication error");
      return;
    }

    setIsUploading(true);
    try {
      await Promise.all(
        files.map((file) =>
          uploadFile(session.accessToken, {
            file,
            name: file.name,
            folderId: currentFolderId,
          }),
        ),
      );
      toast.success(`${files.length} file(s) uploaded successfully`);
      queryClient.invalidateQueries({
        queryKey: ["driveItems", currentFolderId],
      });
      onOpenChange(false); // Use onOpenChange to close
      setFiles([]);
    } catch (error: any) {
      toast.error(error.message || "Failed to upload files");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload File</DialogTitle>
          <DialogDescription>
            Select files to upload to the current folder.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer ${
              isDragActive ? "border-primary" : ""
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            {files.length > 0 ? (
              <p>{files.length} file(s) selected</p>
            ) : (
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop files here, or click to select
              </p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isUploading}
            >
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={isUploading}>
              {isUploading ? "Uploading..." : "Upload Files"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
