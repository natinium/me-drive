// app/(main)/drive/[...slug]/page.tsx
"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type { DriveFile, DriveFolder } from "@/types/drive";
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  RowSelectionState,
} from "@tanstack/react-table";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Folder,
  FileText,
  Image,
  Video,
  Archive,
  MoreHorizontal,
  Download,
  Trash2,
  Share2,
  Edit,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  Star,
  Plus,
} from "lucide-react";

import {
  listFiles,
  listFolders,
  deleteFile,
  deleteFolder,
  getFolderPath,
  downloadFile,
  renameFile,
  renameFolder,
} from "@/lib/api";
import { useSession } from "next-auth/react";

import { NewFolderModal } from "@/components/features/drive/new-folder-modal";
import { UploadModal } from "@/components/features/drive/upload-modal";
import { DriveActionsMenu } from "@/components/features/drive/drive-actions-menu";

// ------------------------------------------------------------------
// Query hooks
const useFolderPath = (folderId?: string) => {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ["folderPath", folderId],
    queryFn: (): Promise<{ name: string; id?: string }[]> =>
      !folderId
        ? Promise.resolve([{ name: "My Drive" }])
        : getFolderPath(session!.accessToken as string, folderId).then((p) => [
            { name: "My Drive" },
            ...p,
          ]),
    enabled: !!session?.accessToken,
    staleTime: 60_000,
  });
};

const useDriveItems = (folderId?: string) => {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ["driveItems", folderId, session?.accessToken],
    queryFn: async () => {
      const token = session!.accessToken as string;
      const [folders, files] = await Promise.all([
        listFolders(token, folderId),
        listFiles(token, folderId ? { folderId } : {}),
      ]);
      return [
        ...(Array.isArray(folders) ? folders : []).map((f: DriveFolder) => ({
          ...f,
          itemType: "folder" as const,
        })),
        ...(Array.isArray(files) ? files : []).map((f: DriveFile) => ({
          ...f,
          itemType: "file" as const,
        })),
      ];
    },
    enabled: !!session?.accessToken,
  });
};

// ------------------------------------------------------------------
export default function MyDrivePage() {
  const params = useParams();
  const router = useRouter();
  const folderId = Array.isArray(params.slug) ? params.slug.at(-1) : undefined;

  const queryClient = useQueryClient();
  const { data: session } = useSession();

  // ----------------- State -----------------
  const [sorting, setSorting] = useState<SortingState>([]);

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
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [previewItem, setPreviewItem] = useState<
    DriveFile | DriveFolder | null
  >(null);
  const [deleteItem, setDeleteItem] = useState<DriveFile | DriveFolder | null>(
    null,
  );
  const [renameItem, setRenameItem] = useState<DriveFile | DriveFolder | null>(
    null,
  );
  const [renameValue, setRenameValue] = useState("");
  const [openUpload, setOpenUpload] = useState(false);
  const [openFolder, setOpenFolder] = useState(false);

  // ----------------- Data -----------------
  const { data: items = [], isLoading } = useDriveItems(folderId);
  const { data: breadcrumbs = [{ name: "My Drive" }] } =
    useFolderPath(folderId);

  // ----------------- Mutations -----------------
  const deleteMutation = useMutation({
    mutationFn: async (item: DriveFile | DriveFolder) => {
      const token = session!.accessToken as string;
      return item.itemType === "folder"
        ? deleteFolder(token, item.id)
        : deleteFile(token, item.id);
    },
    onSuccess: () => {
      toast.success("Deleted");
      queryClient.invalidateQueries({ queryKey: ["driveItems", folderId] });
    },
    onError: (e: Error) => toast.error(e.message || "Delete failed"),
  });

  const renameMutation = useMutation({
    mutationFn: async ({
      item,
      name,
    }: {
      item: DriveFile | DriveFolder;
      name: string;
    }) => {
      const token = session!.accessToken as string;
      return item.itemType === "folder"
        ? renameFolder(token, item.id, name)
        : renameFile(token, item.id, name);
    },
    onSuccess: () => {
      toast.success("Renamed");
      queryClient.invalidateQueries({ queryKey: ["driveItems", folderId] });
    },
    onError: (e: Error) => toast.error(e.message || "Rename failed"),
  });

  // ----------------- Helpers -----------------
  const formatFileSize = useCallback((bytes: number) => {
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    if (!bytes) return "0 B";
    const i = Math.floor((bytes === 0 ? 0 : Math.log(bytes)) / Math.log(1024));
    return `${Math.round((bytes / 1024 ** i) * 100) / 100} ${sizes[i]}`;
  }, []);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / 86_400_000);
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  }, []);

  const getFileIcon = useCallback((item: DriveFile | DriveFolder) => {
    if (item.itemType === "folder")
      return <Folder className="h-4 w-4 text-blue-500" />;
    switch ((item as DriveFile).type) {
      case "application/pdf":
        return <FileText className="h-4 w-4 text-red-500" />;
      case "image/jpeg":
      case "image/png":
      case "image/gif":
        return <Image className="h-4 w-4 text-green-500" />;
      case "video/mp4":
      case "video/quicktime":
        return <Video className="h-4 w-4 text-purple-500" />;
      case "application/zip":
      case "application/x-rar-compressed":
        return <Archive className="h-4 w-4 text-orange-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  }, []);

  // ----------------- Columns -----------------
  const columns = useMemo<ColumnDef<DriveFile | DriveFolder>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(v) => row.toggleSelected(!!v)}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center gap-2">
              {getFileIcon(item)}
              <span className="font-medium">{item.name}</span>
              {item.itemType === "file" && (item as DriveFile).isShared && (
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => {
          const item = row.original;
          const type =
            item.itemType === "folder"
              ? "Folder"
              : (item as DriveFile).type.split("/")[1]?.toUpperCase() || "FILE";
          return (
            <Badge
              variant={item.itemType === "folder" ? "outline" : "secondary"}
            >
              {type}
            </Badge>
          );
        },
      },
      {
        accessorKey: "size",
        header: "Size",
        cell: ({ row }) => {
          const size =
            row.original.itemType === "file"
              ? (row.original as DriveFile).size
              : undefined;
          return (
            <span className="text-sm text-muted-foreground">
              {size ? formatFileSize(size) : "—"}
            </span>
          );
        },
      },
      {
        accessorKey: "updatedAt",
        header: "Modified",
        cell: ({ row }) => (
          <span className="text-sm text-muted-foreground">
            {formatDate(row.original.updatedAt)}
          </span>
        ),
      },
      {
        accessorKey: "isShared",
        header: "Shared",
        cell: ({ row }) => {
          const isShared =
            row.original.itemType === "file"
              ? (row.original as DriveFile).isShared
              : false;
          return isShared ? (
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Shared
            </Badge>
          ) : null;
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const item = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0"
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {item.itemType === "file" && (
                  <DropdownMenuItem
                    onClick={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      downloadFile(
                        session!.accessToken as string,
                        item.id,
                        item.name,
                      );
                    }}
                  >
                    <Download className="mr-2 h-4 w-4" /> Download
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    setRenameItem(item);
                    setRenameValue(item.name);
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" /> Rename
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation();
                    setDeleteItem(item);
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [formatFileSize, formatDate, getFileIcon, session],
  );

  const table = useReactTable({
    data: items,
    columns,
    state: { sorting, columnFilters, rowSelection, globalFilter },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleItemClick = useCallback(
    (item: DriveFile | DriveFolder) => {
      if (item.itemType === "folder") {
        router.push(`/drive/${item.id}`);
      } else {
        setPreviewItem(item);
      }
    },
    [router],
  );

  const handleBreadcrumbClick = useCallback(
    (id?: string) => router.push(`/drive${id ? `/${id}` : ""}`),
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
        <header>
          <h1 className="text-3xl font-bold tracking-tight mb-2">My Drive</h1>
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((c, i) => (
                <BreadcrumbItem key={i}>
                  {i === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>{c.name}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink
                      className="cursor-pointer hover:underline"
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
        </header>

        <div className="flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search files and folders..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
          <div className="flex items-center gap-2">
            <NewFolderModal
              open={openFolder}
              onOpenChange={setOpenFolder}
              currentFolderId={folderId}
            />
            <UploadModal
              open={openUpload}
              onOpenChange={setOpenUpload}
              currentFolderId={folderId}
            />
            <DriveActionsMenu
              folderId={folderId}
              onNewFolderClick={() => setOpenFolder(true)}
              onUploadFileClick={() => setOpenUpload(true)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id}>
                  {hg.headers.map((h) => (
                    <TableHead key={h.id}>
                      {h.isPlaceholder
                        ? null
                        : flexRender(h.column.columnDef.header, h.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((r) => (
                  <TableRow
                    key={r.id}
                    data-state={r.getIsSelected() && "selected"}
                    className="cursor-pointer hover:bg-accent/50"
                    onClick={() => handleItemClick(r.original)}
                  >
                    {r.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No items.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Preview */}
      <Dialog
        open={!!previewItem}
        onOpenChange={(o) => !o && setPreviewItem(null)}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {previewItem && getFileIcon(previewItem)} {previewItem?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {previewItem?.itemType === "file" && (
              <>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>Type:</strong> {(previewItem as DriveFile).type}
                  </div>
                  <div>
                    <strong>Size:</strong>{" "}
                    {formatFileSize((previewItem as DriveFile).size)}
                  </div>
                  <div>
                    <strong>Modified:</strong>{" "}
                    {formatDate(previewItem.updatedAt)}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setPreviewItem(null)}
                  >
                    <X className="mr-2 h-4 w-4" /> Close
                  </Button>
                  <Button
                    onClick={() =>
                      downloadFile(
                        session!.accessToken as string,
                        previewItem.id,
                        previewItem.name,
                      )
                    }
                  >
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                </DialogFooter>
              </>
            )}
            {previewItem?.itemType === "folder" && (
              <>
                <p className="text-sm">Folder details placeholder…</p>
                <DialogFooter>
                  <Button onClick={() => setPreviewItem(null)}>Close</Button>
                </DialogFooter>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete */}
      <Dialog
        open={!!deleteItem}
        onOpenChange={(o) => !o && setDeleteItem(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete “{deleteItem?.name}”?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-muted-foreground">
            This action cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteItem(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteMutation.mutate(deleteItem!)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename */}
      <Dialog
        open={!!renameItem}
        onOpenChange={(o) => !o && setRenameItem(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename {renameItem?.itemType}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Label htmlFor="rename">Name</Label>
            <Input
              id="rename"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameItem(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                renameMutation.mutate({ item: renameItem!, name: renameValue });
                setRenameItem(null);
              }}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
