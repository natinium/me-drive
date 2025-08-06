"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Upload } from "lucide-react";
import { useDriveStore } from "@/stores/drive-store";
import { toast } from "sonner";

export function UploadButton({ folderId }: { folderId?: string }) {
  const {
    isUploadModalOpen,
    uploadFiles,
    currentFolderId,
    openUploadModal,
    closeUploadModal,
    setUploadFiles,
  } = useDriveStore();

  const handleFileUpload = (files: File[]) => {
    if (files.length > 0) {
      const targetFolderId = folderId || currentFolderId;
      toast.success(
        `${files.length} file(s) uploaded successfully to ${targetFolderId ? "current folder" : "root"}`,
      );
      setUploadFiles([]);
      closeUploadModal();
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileSelect = () => {
    // Create hidden file input
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      if (files.length > 0) {
        handleFileUpload(files);
      }
    };
    input.click();
  };

  return (
    <Dialog open={isUploadModalOpen} onOpenChange={closeUploadModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>
            Select files to upload to the current folder.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div
            className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleFileSelect}
          >
            <Upload className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
            <p className="text-sm text-muted-foreground mb-2">
              Drag and drop files here, or click to select
            </p>
            <Button variant="outline" onClick={handleFileSelect}>
              Select Files
            </Button>
          </div>
          {uploadFiles.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Selected files:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {uploadFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
