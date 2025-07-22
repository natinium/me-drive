"use client";

import { useEffect } from "react";
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
import { renameItem } from "@/lib/api/drive";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const renameSchema = z.object({
  name: z.string().min(1, { message: "Name cannot be empty." }),
});

type RenameValues = z.infer<typeof renameSchema>;

export function RenameItemDialog() {
  const { isRenameDialogOpen, closeRenameDialog, actionTargetItem } =
    useUIStore();
  const searchParams = useSearchParams();
  const folderId = searchParams.get("folderId");
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<RenameValues>({
    resolver: zodResolver(renameSchema),
  });

  useEffect(() => {
    if (actionTargetItem && isRenameDialogOpen) {
      setValue("name", actionTargetItem.name);
    }
  }, [actionTargetItem, isRenameDialogOpen, setValue]);

  const renameMutation = useMutation({
    mutationFn: (data: { id: string; newName: string }) =>
      renameItem(data.id, data.newName),
    onSuccess: () => {
      toast.success("Item renamed successfully!");
      queryClient.invalidateQueries({ queryKey: ["driveItems", folderId] });
      handleClose();
    },
    onError: (error) => {
      toast.error(`Failed to rename item: ${error.message}`);
    },
  });

  const onSubmit = (data: RenameValues) => {
    if (!actionTargetItem) return;
    renameMutation.mutate({ id: actionTargetItem.id, newName: data.name });
  };

  const handleClose = () => {
    reset();
    closeRenameDialog();
  };

  return (
    <Dialog open={isRenameDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Rename Item</DialogTitle>
            <DialogDescription>
              Enter a new name for &apos;{actionTargetItem?.name}&apos;.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <div className="col-span-3">
                <Input
                  id="name"
                  {...register("name")}
                  autoFocus
                  onFocus={(e) => e.target.select()}
                />
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
            <Button type="submit" disabled={renameMutation.isPending}>
              {renameMutation.isPending ? "Renaming..." : "Rename"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
