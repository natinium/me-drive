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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFolder } from "@/lib/api/drive";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const createFolderSchema = z.object({
  name: z.string().min(1, { message: "Folder name cannot be empty." }),
});

type CreateFolderValues = z.infer<typeof createFolderSchema>;

export function CreateFolderDialog() {
  const { isCreateFolderDialogOpen, closeCreateFolderDialog } = useUIStore();
  const searchParams = useSearchParams();
  const folderId = searchParams.get("folderId");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateFolderValues>({
    resolver: zodResolver(createFolderSchema),
    defaultValues: { name: "" },
  });

  const createFolderMutation = useMutation({
    mutationFn: (data: { name: string; parentId: string | null }) =>
      createFolder(data.name, data.parentId),
    onSuccess: () => {
      toast.success("Folder created successfully!");
      queryClient.invalidateQueries({ queryKey: ["driveItems", folderId] });
      handleClose();
    },
    onError: (error) => {
      toast.error(`Failed to create folder: ${error.message}`);
    },
  });

  const onSubmit = (data: CreateFolderValues) => {
    createFolderMutation.mutate({ name: data.name, parentId: folderId });
  };

  const handleClose = () => {
    reset();
    closeCreateFolderDialog();
  };

  return (
    <Dialog open={isCreateFolderDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>New Folder</DialogTitle>
            <DialogDescription>
              Enter a name for your new folder in the current directory.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input id="name" {...register("name")} autoFocus />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createFolderMutation.isPending}>
              {createFolderMutation.isPending ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
