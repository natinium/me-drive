"use client";

import { Suspense } from "react";
import { columns, DriveItem } from "./columns";
import { DataTable } from "./data-table";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchFolderContents } from "@/lib/api/drive";

function MyDriveContent() {
  const searchParams = useSearchParams();
  const folderId = searchParams.get("folderId");

  const {
    data: items,
    isLoading,
    isError,
    error,
  } = useQuery<DriveItem[]>({
    queryKey: ["driveItems", folderId],
    queryFn: () => fetchFolderContents(folderId),
  });

  // Simple breadcrumb logic. A real app would fetch the full path.
  const breadcrumbPath = folderId
    ? [{ name: "My Drive", href: "/my-drive" }, { name: "Current Folder" }]
    : [{ name: "My Drive" }];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-2">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      );
    }

    if (isError) {
      return (
        <div className="text-center text-red-500">Error: {error.message}</div>
      );
    }

    return <DataTable columns={columns} data={items ?? []} />;
  };

  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbPath.map((crumb, index) => (
            <>
              <BreadcrumbItem key={index}>
                {index === breadcrumbPath.length - 1 ? (
                  <BreadcrumbPage>{crumb.name}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={crumb.href!}>
                    {crumb.name}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadcrumbPath.length - 1 && <BreadcrumbSeparator />}
            </>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <div>{renderContent()}</div>
    </div>
  );
}

export default function MyDrivePage() {
  // Suspense Boundary is crucial for useSearchParams to work correctly in Next.js App Router
  return (
    <Suspense fallback={<div>Loading Navigation...</div>}>
      <MyDriveContent />
    </Suspense>
  );
}
