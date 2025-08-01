import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Folder, Plus, Menu } from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 p-4 border-r hidden md:flex flex-col">
      {/* TODO: Implement application logo/name */}
      <div className="mb-6 text-2xl font-bold">FileManager</div>

      {/* TODO: Implement "New" dropdown button */}
      <div className="mb-6">
        <Button className="w-full">
          {" "}
          <Plus className="mr-2 h-4 w-4" /> New
        </Button>
        {/* Dropdown menu for upload/create folder */}
      </div>

      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md"
            >
              <Home className="mr-2 h-5 w-5" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/drive"
              className="flex items-center p-2 text-gray-700 hover:bg-gray-200 rounded-md"
            >
              <Folder className="mr-2 h-5 w-5" />
              My Drive
            </Link>
          </li>
        </ul>
      </nav>

      {/* TODO: Implement User Profile Section */}
      <div className="mt-auto p-4 border-t">
        <div className="flex items-center">
          {/* User Avatar */}
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-bold">
            JD
          </div>
          <div className="ml-3">
            <p className="font-semibold">John Doe</p>
            <p className="text-sm text-gray-500">john@example.com</p>
          </div>
        </div>
        {/* Theme Toggle and Sign Up Button */}
      </div>
    </aside>
  );
};

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-4 w-64">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
