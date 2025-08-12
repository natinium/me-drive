"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

import { listFolders, listFiles, createFolder, uploadFile } from "@/lib/api";
import type { DriveFile, DriveFolder } from "@/types/drive";

export default function DriveTestPage() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const [folderName, setFolderName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Fetch drive items
  const {
    data: items = [],
    isLoading,
    error,
  } = useQuery<Array<DriveFile | DriveFolder>>({
    queryKey: ["driveItemsTest"],
    queryFn: async () => {
      if (!session?.accessToken) return [];
      const token = session.accessToken;
      const [folders, files] = await Promise.all([
        listFolders(token), // Fetch root folders
        listFiles(token), // Fetch root files
      ]);
      return [
        ...(Array.isArray(folders) ? folders : []).map((f: any) => ({
          ...f,
          itemType: "folder" as const,
        })),
        ...(Array.isArray(files) ? files : []).map((f: any) => ({
          ...f,
          itemType: "file" as const,
        })),
      ];
    },
    enabled: !!session?.accessToken,
  });

  // Create folder mutation
  const createFolderMutation = useMutation({
    mutationFn: async (name: string) => {
      if (!session?.accessToken) throw new Error("Not authenticated");
      return createFolder(session.accessToken, { name, parentId: null });
    },
    onSuccess: () => {
      toast.success("Folder created successfully!");
      queryClient.invalidateQueries({ queryKey: ["driveItemsTest"] });
      setFolderName("");
    },
    onError: (err: any) => {
      toast.error(`Failed to create folder: ${err.message || "Unknown error"}`);
    },
  });

  // Upload file mutation
  const uploadFileMutation = useMutation({
    mutationFn: async (file: File) => {
      if (!session?.accessToken) throw new Error("Not authenticated");
      return uploadFile(session.accessToken, {
        file,
        name: file.name,
        folderId: null,
      });
    },
    onSuccess: () => {
      toast.success("File uploaded successfully!");
      queryClient.invalidateQueries({ queryKey: ["driveItemsTest"] });
      setSelectedFile(null);
    },
    onError: (err: any) => {
      toast.error(`Failed to upload file: ${err.message || "Unknown error"}`);
    },
  });

  const handleCreateFolder = () => {
    if (folderName.trim()) {
      createFolderMutation.mutate(folderName);
    } else {
      toast.error("Folder name cannot be empty");
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      uploadFileMutation.mutate(selectedFile);
    } else {
      toast.error("Please select a file to upload");
    }
  };

  if (isLoading) return <div>Loading drive items...</div>;
  if (error) return <div>Error loading drive items: {error.message}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Drive Test Page</h1>

      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Create New Folder</h2>
        <input
          type="text"
          placeholder="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={handleCreateFolder}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={createFolderMutation.isPending}
        >
          {createFolderMutation.isPending ? "Creating..." : "Create Folder"}
        </button>
      </div>

      <div className="mb-8 p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Upload File</h2>
        <input
          type="file"
          onChange={(e) =>
            setSelectedFile(e.target.files ? e.target.files[0] : null)
          }
          className="mr-2"
        />
        <button
          onClick={handleFileUpload}
          className="bg-green-500 text-white px-4 py-2 rounded"
          disabled={uploadFileMutation.isPending}
        >
          {uploadFileMutation.isPending ? "Uploading..." : "Upload File"}
        </button>
      </div>

      <div className="p-4 border rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Drive Items</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Type</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">ID</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-500">
                  No items found.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td className="py-2 px-4 border-b">
                    {item.itemType === "folder" ? "Folder" : "File"}
                  </td>
                  <td className="py-2 px-4 border-b">{item.name}</td>
                  <td className="py-2 px-4 border-b">{item.id}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
