"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Settings,
  User,
  LogOut,
  HelpCircle,
  Bell,
  Moon,
  Sun,
  Plus,
  Upload,
  FolderPlus,
  Activity,
  ChevronDown,
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { signOutAction } from "@/actions/auth.actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [searchFocused, setSearchFocused] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 shadow-sm transition-all duration-200">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="h-8 w-8" />
        <div className="hidden md:block">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/dashboard"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-muted-foreground" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-sm font-medium text-muted-foreground">
                  Overview
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      <div className="flex-1" />

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search files, folders, and more..."
            className={cn(
              "w-full rounded-lg bg-muted/50 pl-10 pr-4 transition-all duration-200",
              "focus:bg-background focus:ring-2 focus:ring-primary/20 focus:shadow-lg",
              "md:w-[280px] lg:w-[400px]",
              searchFocused && "md:w-[320px] lg:w-[480px]",
            )}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-muted/50"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 hover:bg-muted/50 relative"
        >
          <Bell className="h-4 w-4" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-[10px] font-semibold">
            3
          </Badge>
          <span className="sr-only">Notifications</span>
        </Button>

        {session && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild data-testid="user-menu-trigger">
              <Button
                variant="ghost"
                className="h-9 w-9 p-0 rounded-full hover:bg-muted/50"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session.user?.image ?? ""}
                    alt={session.user?.name ?? ""}
                  />
                  <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
                    {session.user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              <DropdownMenuLabel>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={session.user?.image ?? ""}
                      alt={session.user?.name ?? ""}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {session.user?.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-semibold">
                      {session.user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Activity className="mr-2 h-4 w-4" />
                Activity
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <form action={signOutAction}>
                <button type="submit" className="w-full">
                  <DropdownMenuItem className="cursor-pointer text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </button>
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};
