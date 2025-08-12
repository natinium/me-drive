"use client";

import React, { useEffect, useState } from "react";

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
        const [u, f, fo] = await Promise.all([
          fetch(`${baseUrl}/admin/users`).then((r) => r.json()),
          fetch(`${baseUrl}/admin/files`).then((r) => r.json()),
          fetch(`${baseUrl}/admin/folders`).then((r) => r.json()),
        ]);
        setUsers(u);
        setFiles(f);
        setFolders(fo);
      } catch (e: any) {
        setError(e?.message || "Failed to load admin data");
      }
    })();
  }, []);

  return (
    <div className="container mx-auto p-6 space-y-10">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      {error && (
        <div className="rounded-md bg-red-100 text-red-700 p-3 text-sm">
          {error}
        </div>
      )}
      <section>
        <h2 className="text-xl font-medium mb-2">Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Email</th>
                <th className="p-2">Name</th>
                <th className="p-2">Storage Used</th>
                <th className="p-2">Storage Limit</th>
                <th className="p-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b hover:bg-muted/20">
                  <td className="p-2">{u.id}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.storageUsed}</td>
                  <td className="p-2">{u.storageLimit}</td>
                  <td className="p-2">
                    {new Date(u.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-2">Files</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Type</th>
                <th className="p-2">Size</th>
                <th className="p-2">Owner</th>
                <th className="p-2">Folder</th>
                <th className="p-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {files.map((f) => (
                <tr key={f.id} className="border-b hover:bg-muted/20">
                  <td className="p-2">{f.id}</td>
                  <td className="p-2">{f.name}</td>
                  <td className="p-2">{f.type}</td>
                  <td className="p-2">{f.size}</td>
                  <td className="p-2">{f.ownerId}</td>
                  <td className="p-2">{f.folderId || "-"}</td>
                  <td className="p-2">
                    {new Date(f.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-medium mb-2">Folders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="p-2">ID</th>
                <th className="p-2">Name</th>
                <th className="p-2">Parent</th>
                <th className="p-2">Owner</th>
                <th className="p-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {folders.map((fo) => (
                <tr key={fo.id} className="border-b hover:bg-muted/20">
                  <td className="p-2">{fo.id}</td>
                  <td className="p-2">{fo.name}</td>
                  <td className="p-2">{fo.parentId || "-"}</td>
                  <td className="p-2">{fo.ownerId}</td>
                  <td className="p-2">
                    {new Date(fo.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
