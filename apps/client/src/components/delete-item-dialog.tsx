"use client";

import { useUIStore } from "@/stores/useUIStore";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "@/lib/api/drive";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function DeleteItemDialog() {
  const { isDeleteDialogOpen, closeDeleteDialog, actionTargetItem } =
    useUIStore();
  const searchParams = useSearchParams();
  const folderId = searchParams.get("folderId");
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteItem(id),
    onSuccess: () => {
      toast.success("Item deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["driveItems", folderId] });
      closeDeleteDialog();
    },
    onError: (error) => {
      toast.error(`Failed to delete item: ${error.message}`);
    },
  });

  const handleDelete = () => {
    if (!actionTargetItem) return;
    deleteMutation.mutate(actionTargetItem.id);
  };

  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={closeDeleteDialog}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the{" "}
            {actionTargetItem?.type} named &apos{actionTargetItem?.name}&apos.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
