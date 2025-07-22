import {
  ChevronUp,
  Folder,
  Home,
  Infinity,
} from "lucide-react";
import { auth, signOut } from "@/auth";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NewItemButton } from "./new-item-button"; // <-- IMPORT THE NEW COMPONENT

// Menu items
const items = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "MyDrive", url: "/my-drive", icon: Folder },
];

export async function AppSidebar() {
  const session = await auth();

  const getInitials = (name?: string | null) => {
    // ... (your existing function)
    if (!name) return ""
    const names = name.split(" ")
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  };

  return (
    <Sidebar collapsible="icon" className="group">
      <SidebarHeader>
        <div className="flex items-center gap-2.5 justify-center">
          <Infinity className="size-6 flex-shrink-0" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* --- ADD THE NEW BUTTON HERE --- */}
        <NewItemButton /> 

        <SidebarGroup>
          {/* You can remove the "Application" label if you wish */}
          <SidebarGroupContent className="mt-4">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span className="group-data-[collapsed=true]:hidden">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {/* ... (rest of your footer code is unchanged) ... */}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <div className="flex w-full items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarImage src={session?.user?.image ?? undefined} />
                      <AvatarFallback>
                        {getInitials(session?.user?.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="truncate group-data-[collapsed=true]:hidden">
                      {session?.user?.name ?? "Account"}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto group-data-[collapsed=true]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width] mb-2"
              >
                <DropdownMenuItem>Account</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <form
                  action={async () => {
                    "use server";
                    await signOut();
                  }}
                  className="w-full"
                >
                  <button type="submit" className="w-full">
                    <DropdownMenuItem className="cursor-pointer">
                      Sign out
                    </DropdownMenuItem>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}