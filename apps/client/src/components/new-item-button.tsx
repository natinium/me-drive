"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { FileUp, FolderPlus, Plus } from "lucide-react";

import { createFolder, uploadFile } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SidebarMenuButton } from "./ui/sidebar";

// A submit button that shows a pending state
function DialogSubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return <Button type="submit" aria-disabled={pending}>{pending ? "Saving..." : children}</Button>
}

export function NewItemButton() {
  const params = useParams();
  const folderId = params.folderId as string | undefined;

  const [isFolderDialogOpen, setFolderDialogOpen] = useState(false);
  const [isFileDialogOpen, setFileDialogOpen] = useState(false);

  // Form state for creating a folder
  const [folderFormState, dispatchFolderAction] = useFormState(createFolder, undefined);
  // Form state for uploading a file
  const [fileFormState, dispatchFileAction] = useFormState(uploadFile, undefined);
  
  // Close dialog on successful submission
  useEffect(() => {
    if (folderFormState?.message === "success") setFolderDialogOpen(false);
  }, [folderFormState]);

  useEffect(() => {
    if (fileFormState?.message === "success") setFileDialogOpen(false);
  }, [fileFormState]);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton className="mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="mr-2" />
            <span className="group-data-[collapsed=true]:hidden">New</span>
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 ml-4 mb-2" side="top" align="start">
          <DropdownMenuItem onSelect={() => setFolderDialogOpen(true)}>
            <FolderPlus className="mr-2 h-4 w-4" />
            <span>New Folder</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setFileDialogOpen(true)}>
            <FileUp className="mr-2 h-4 w-4" />
            <span>Upload File</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* New Folder Dialog */}
      <Dialog open={isFolderDialogOpen} onOpenChange={setFolderDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Folder</DialogTitle>
            <DialogDescription>
              Enter a name for your new folder.
            </DialogDescription>
          </DialogHeader>
          <form action={dispatchFolderAction} className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="folderName">Folder Name</Label>
              <Input id="folderName" name="folderName" required />
              {/* This hidden input passes the current folder context */}
              <input type="hidden" name="parentId" value={folderId || ""} />
            </div>
            {folderFormState?.message && folderFormState.message !== "success" && (
              <p className="text-sm text-red-500">{folderFormState.message}</p>
            )}
            <DialogFooter>
              <DialogSubmitButton>Create Folder</DialogSubmitButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Upload File Dialog */}
      <Dialog open={isFileDialogOpen} onOpenChange={setFileDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload File</DialogTitle>
            <DialogDescription>
              Choose a file from your computer to upload.
            </DialogDescription>
          </DialogHeader>
          {/* IMPORTANT: Add encType for file uploads */}
          <form action={dispatchFileAction} encType="multipart/form-data" className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="file">File</Label>
              <Input id="file" name="file" type="file" required />
              <input type="hidden" name="parentId" value={folderId || ""} />
            </div>
            {fileFormState?.message && fileFormState.message !== "success" && (
              <p className="text-sm text-red-500">{fileFormState.message}</p>
            )}
            <DialogFooter>
              <DialogSubmitButton>Upload</DialogSubmitButton>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}