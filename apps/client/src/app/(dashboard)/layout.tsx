import { AppSidebar } from "@/components/app-sidebar";
import { CreateFolderDialog } from "@/components/create-folder-dialog";
import { DeleteItemDialog } from "@/components/delete-item-dialog";
import { RenameItemDialog } from "@/components/rename-item-dialog";
import { UploadFileDialog } from "@/components/upload-file-dialog";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>

      {/* Place all dialogs and the toaster here so they are available across the dashboard */}
      <CreateFolderDialog />
      <UploadFileDialog />
      <RenameItemDialog />
      <DeleteItemDialog />
      <Toaster richColors />
    </SidebarProvider>
  );
}
