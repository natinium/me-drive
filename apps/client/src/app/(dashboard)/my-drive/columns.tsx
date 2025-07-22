"use client"

import { ColumnDef } from "@tanstack/react-table"
import { File, Folder, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Define the shape of our data for a file or folder.
// Based on your API, we can infer these properties.
export type DriveItem = {
  id: number
  name: string
  type: 'file' | 'folder' // We need to distinguish between files and folders
  size: number | null // Folders won't have a size
  updatedAt: string // Comes as an ISO date string from the API
}

// Helper function to format bytes into KB, MB, GB etc.
const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}


export const columns: ColumnDef<DriveItem>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const item = row.original
      return (
        <div className="flex items-center gap-2 font-medium">
          {item.type === 'folder' ? (
            <Folder className="size-4 text-sky-500" />
          ) : (
            <File className="size-4 text-gray-500" />
          )}
          <span>{item.name}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "updatedAt",
    header: "Last Modified",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => {
      const item = row.original
      // Show size for files, or a dash for folders
      return <div>{item.type === 'file' && item.size ? formatBytes(item.size) : '—'}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const item = row.original

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {/* Add actions like Download, Rename, Delete etc. here */}
              {item.type === 'file' && <DropdownMenuItem>Download</DropdownMenuItem>}
              <DropdownMenuItem>Rename</DropdownMenuItem>
              <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]