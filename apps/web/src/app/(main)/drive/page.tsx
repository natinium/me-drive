"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { driveFolders, driveFiles } from "./data";
import type { DriveFile, DriveFolder } from "@/types/drive";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import {
  Folder,
  File,
  FileText,
  Image,
  Video,
  Archive,
  MoreHorizontal,
  Download,
  Trash2,
  Share2,
  Edit,
  FolderOpen,
  Upload,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { DriveActionsMenu } from "@/components/features/drive/drive-actions-menu";

export default function MyDrivePage({ folderId }: { folderId?: string } = {}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [currentPath, setCurrentPath] = useState(
    folderId ? `/folder/${folderId}` : "/",
  );
  const [folderStack, setFolderStack] = useState<DriveFolder[]>([]);
  const [selectedItem, setSelectedItem] = useState<
    DriveFile | DriveFolder | null
  >(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const router = useRouter();

  interface ExtendedDriveFolder extends DriveFolder {
    items?: ExtendedDriveFolder[];
  }

  // Mock nested folder structure
  const nestedFolders: ExtendedDriveFolder[] = [
    ...driveFolders.map((folder) => ({
      ...folder,
      items: [
        {
          id: `${folder.id}-sub1`,
          name: `Subfolder 1`,
          type: "folder" as const,
          parentId: folder.id,
          path: `${folder.path}/Subfolder 1`,
          fileCount: 5,
          folderCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: `${folder.id}-sub2`,
          name: `Subfolder 2`,
          type: "folder" as const,
          parentId: folder.id,
          path: `${folder.path}/Subfolder 2`,
          fileCount: 12,
          folderCount: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    })),
  ];

  const currentItems = useMemo(() => {
    const allItems = [...nestedFolders, ...driveFiles];

    // Use folderId if provided via props (from dynamic route)
    if (folderId) {
      return allItems.filter(
        (item) =>
          (item.type === "folder" && item.parentId === folderId) ||
          (item.type === "file" && item.folderId === folderId),
      );
    }

    if (currentPath === "/") {
      return allItems.filter(
        (item) =>
          (item.type === "folder" && item.parentId === null) ||
          (item.type === "file" && item.folderId === null),
      );
    }

    const currentFolder = nestedFolders.find((f) => f.path === currentPath);
    const currentFolderId = currentFolder?.id;

    return allItems.filter(
      (item) =>
        (item.type === "folder" && item.parentId === currentFolderId) ||
        (item.type === "file" && item.folderId === currentFolderId),
    );
  }, [currentPath, nestedFolders, folderId]);

  const breadcrumbItems = useMemo(() => {
    if (folderId) {
      const folder = nestedFolders.find((f) => f.id === folderId);
      return [
        { name: "My Drive", path: "/drive" },
        { name: folder?.name || "Folder", path: `/drive/${folderId}` },
      ];
    }

    if (currentPath === "/") return [{ name: "My Drive", path: "/drive" }];

    const parts = currentPath.split("/").filter(Boolean);
    const items = [{ name: "My Drive", path: "/drive" }];

    let current = "";
    parts.forEach((part) => {
      current += `/${part}`;
      items.push({ name: part, path: `${current}/` });
    });

    return items;
  }, [currentPath, folderId, nestedFolders]);

  const getFileIcon = (item: DriveFile | DriveFolder | null) => {
    if (!item) {
      return <File className="h-4 w-4 text-gray-500" />;
    }

    if (item.type === "folder") {
      return <Folder className="h-4 w-4 text-blue-500" />;
    }

    const file = item as DriveFile;
    switch (file.mimeType) {
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
        return <File className="h-4 w-4 text-gray-500" />;
    }
  };

  const handleFolderClick = (folder: ExtendedDriveFolder) => {
    router.push(`/drive/${folder.id}`);
  };

  const handleBreadcrumbClick = (path: string) => {
    if (path === "/drive") {
      router.push("/drive");
    } else if (path.startsWith("/drive/")) {
      const folderId = path.replace("/drive/", "");
      router.push(path);
    } else {
      setCurrentPath(path);
      const index = breadcrumbItems.findIndex((item) => item.path === path);
      setFolderStack(folderStack.slice(0, index - 1));
    }
  };

  const handleItemClick = (item: DriveFile | DriveFolder) => {
    if (item.type === "folder") {
      handleFolderClick(item as ExtendedDriveFolder);
    } else {
      setSelectedItem(item);
      setIsPreviewOpen(true);
    }
  };

  const formatFileSize = (bytes: number): string => {
    const sizes = ["B", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "0 B";
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round((bytes / Math.pow(1024, i)) * 100) / 100} ${sizes[i]}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const columns: ColumnDef<DriveFile | DriveFolder>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value: boolean | "indeterminate") =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value: boolean | "indeterminate") =>
            row.toggleSelected(!!value)
          }
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
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
            {/* Note: isStarred is not available in API response, may need to be added later */}
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <Badge variant={item.type === "folder" ? "outline" : "secondary"}>
            {item.type === "folder"
              ? "Folder"
              : (item as DriveFile).mimeType.split("/")[1]?.toUpperCase() ||
                "FILE"}
          </Badge>
        );
      },
    },
    {
      accessorKey: "size",
      header: "Size",
      cell: ({ row }) => {
        const item = row.original;
        const size =
          item.type === "file" ? (item as DriveFile).size : undefined;
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
      cell: ({ row }) => {
        const item = row.original;
        return (
          <span className="text-sm text-muted-foreground">
            {formatDate(item.updatedAt)}
          </span>
        );
      },
    },
    {
      accessorKey: "isShared",
      header: "Shared",
      cell: ({ row }) => {
        const item = row.original;
        const isShared =
          item.type === "file" ? (item as DriveFile).isShared : false;
        return isShared ? (
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            Shared
          </Badge>
        ) : null;
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const item = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                Download
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Rename
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable({
    data: currentItems,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
    },
  });

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground mb-2">
            My Drive
          </h1>
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbItems.map((item, index) => (
                <React.Fragment key={item.path}>
                  <BreadcrumbItem>
                    {index === breadcrumbItems.length - 1 ? (
                      <BreadcrumbPage>{item.name}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        className="cursor-pointer hover:underline"
                        onClick={() => handleBreadcrumbClick(item.path || "/")}
                      >
                        {item.name}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {index < breadcrumbItems.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search files and folders..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
        </div>

        <DriveActionsMenu folderId={folderId} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="cursor-pointer hover:bg-accent/50 transition-colors"
                  onClick={() => handleItemClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {getFileIcon(selectedItem)}
              {selectedItem?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedItem?.type === "file" && (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    File Details
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Type:</span>{" "}
                      {(selectedItem as DriveFile).mimeType || "Unknown"}
                    </div>
                    <div>
                      <span className="font-medium">Size:</span>{" "}
                      {formatFileSize((selectedItem as DriveFile).size || 0)}
                    </div>
                    <div>
                      <span className="font-medium">Modified:</span>{" "}
                      {formatDate((selectedItem as DriveFile).updatedAt)}
                    </div>
                    <div>
                      <span className="font-medium">Path:</span>{" "}
                      {(selectedItem as DriveFile).folderId || "Root"}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsPreviewOpen(false)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Close
                  </Button>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            )}
            {selectedItem?.type === "folder" && (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    Folder Details
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Files:</span>{" "}
                      {(selectedItem as ExtendedDriveFolder).fileCount || 0}
                    </div>
                    <div>
                      <span className="font-medium">Folders:</span>{" "}
                      {(selectedItem as ExtendedDriveFolder).folderCount || 0}
                    </div>
                    <div>
                      <span className="font-medium">Modified:</span>{" "}
                      {formatDate(
                        (selectedItem as ExtendedDriveFolder).updatedAt,
                      )}
                    </div>
                    <div>
                      <span className="font-medium">Path:</span>{" "}
                      {(selectedItem as ExtendedDriveFolder).path}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsPreviewOpen(false)}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Close
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
