"use client";

import React, { useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { DriveFile, DriveFolder } from "@/types/drive";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { listFiles, listFolders, getFolderPath } from "@/lib/api";
import { useSession } from "next-auth/react";
import { useDriveStore } from "@/stores/drive-store";

import DriveActionsMenu from "@/components/features/drive/drive-actions-menu";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

// ------------------------------------------------------------------
// Query hooks
const useFolderPath = (folderId?: string) => {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ["folderPath", folderId],
    queryFn: () => {
      if (!folderId) {
        return Promise.resolve([{ name: "My Drive" }]);
      }
      return getFolderPath(session!.accessToken as string, folderId).then(
        (p) => [{ name: "My Drive" }, ...p],
      );
    },
    enabled: !!session?.accessToken,
    staleTime: 60_000,
  });
};

const useDriveItems = (folderId?: string) => {
  const { data: session } = useSession();
  return useQuery<Array<DriveFile | DriveFolder>>({
    queryKey: ["driveItems", folderId, session?.accessToken],
    queryFn: async () => {
      if (!session?.accessToken) return [];
      const token = session.accessToken;
      console.log("Fetching folders with parentId:", folderId);
      const folders = await listFolders(token, folderId);
      console.log("Fetched folders:", folders);
      console.log("Fetching files with folderId:", folderId);
      const files = await listFiles(token, folderId ? { folderId } : {});
      console.log("Fetched files:", files);
      const result = [
        ...(Array.isArray(folders) ? folders : []).map((f: any) => ({
          ...f,
          itemType: "folder" as const,
        })),
        ...(Array.isArray(files) ? files : []).map((f: any) => ({
          ...f,
          itemType: "file" as const,
        })),
      ];
      console.log("Combined items:", result);
      return result;
    },
    enabled: !!session?.accessToken,
  });
};

// ------------------------------------------------------------------
export default function MyDrivePage() {
  const params = useParams();
  const router = useRouter();
  const folderId = params.folderId as string;

  const queryClient = useQueryClient();
  const { openUploadModal, openCreateFolderModal } = useDriveStore();

  // Refresh drive items on external events
  useEffect(() => {
    const handleDriveRefresh = () => {
      queryClient.invalidateQueries({ queryKey: ["driveItems", folderId] });
    };
    window.addEventListener("drive:refresh", handleDriveRefresh);
    return () => {
      window.removeEventListener("drive:refresh", handleDriveRefresh);
    };
  }, [queryClient, folderId]);

  const { data: items = [], isLoading } = useDriveItems(folderId);

  // Sort items chronologically by updatedAt date (newest first)
  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  }, [items]);
  const { data: breadcrumbs = [{ name: "My Drive" }] } =
    useFolderPath(folderId);

  useEffect(() => {
    console.log("Drive items:", items);
  }, [items]);

  const handleBreadcrumbClick = useCallback(
    (id?: string) => {
      if (id) {
        router.push(`/drive/${id}`);
      } else {
        router.push("/drive");
      }
    },
    [router],
  );

  const handleRowClick = useCallback(
    (item: DriveFile | DriveFolder) => {
      if (item.itemType === "folder") {
        router.push(`/drive/${item.id}`);
      } else {
        // For files, we could open a preview or download
        // For now, we'll just show a toast
        toast.info(`File clicked: ${item.name}`);
      }
    },
    [router],
  );

  if (isLoading)
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-96 w-full" />
      </div>
    );

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Drive</h1>
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((c, i) => (
                  <BreadcrumbItem key={i}>
                    {i === breadcrumbs.length - 1 ? (
                      <BreadcrumbPage className="font-medium">
                        {c.name}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        className="cursor-pointer hover:underline text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => handleBreadcrumbClick(c.id)}
                      >
                        {c.name}
                      </BreadcrumbLink>
                    )}
                    {i < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center gap-2">
            <DriveActionsMenu
              folderId={folderId}
              onNewFolderClick={() => openCreateFolderModal(folderId)}
              onUploadFileClick={() => openUploadModal(folderId)}
            />
          </div>
        </div>

        <DataTable
          columns={columns}
          data={sortedItems}
          onRowClick={handleRowClick}
        />
      </div>
    </>
  );
}
