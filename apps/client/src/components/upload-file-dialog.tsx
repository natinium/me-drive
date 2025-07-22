"use client";

import { useUIStore } from "@/stores/useUIStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadFile } from "@/lib/api/drive";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function UploadFileDialog() {
  const { isUploadFileDialogOpen, closeUploadFileDialog } = useUIStore();
  const searchParams = useSearchParams();
  const folderId = searchParams.get("folderId");
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const uploadFileMutation = useMutation({
    mutationFn: (data: { file: File; parentId: string | null }) =>
      uploadFile(data.file, data.parentId),
    onSuccess: () => {
      toast.success("File uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["driveItems", folderId] });
      handleClose();
    },
    onError: (error) => {
      toast.error(`Failed to upload file: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.warning("Please select a file to upload.");
      return;
    }
    uploadFileMutation.mutate({ file: selectedFile, parentId: folderId });
  };

  const handleClose = () => {
    setSelectedFile(null);
    closeUploadFileDialog();
  };

  return (
    <Dialog open={isUploadFileDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
            <DialogDescription>
              Select a file to upload to the current directory.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="file">File</Label>
              <Input
                id="file"
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!selectedFile || uploadFileMutation.isPending}
            >
              {uploadFileMutation.isPending ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
