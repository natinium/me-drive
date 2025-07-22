import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { File, Folder, HardDrive } from "lucide-react";

// We can reuse the DriveItem type from the my-drive page
type DriveItem = {
  id: number;
  name: string;
  type: "file" | "folder";
  size: number | null;
  updatedAt: string;
};

// Helper to fetch data (could be moved to a shared lib file)
async function getDriveData(): Promise<DriveItem[]> {
  const session = await auth();
  if (!session?.accessToken) redirect("/auth/login");

  try {
    const response = await fetch(`${process.env.API_URL}/files`, {
      headers: { Authorization: `Bearer ${session.accessToken}` },
      cache: "no-store",
    });
    if (!response.ok) return [];
    return (await response.json()) as DriveItem[];
  } catch (error) {
    return [];
  }
}

// Helper to format bytes
const formatBytes = (bytes: number, decimals = 2) => {
  if (!+bytes) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export default async function DashboardPage() {
  const allItems = await getDriveData();

  // --- Calculate Stats ---
  const totalFiles = allItems.filter((item) => item.type === "file").length;
  const totalFolders = allItems.filter((item) => item.type === "folder").length;
  const totalStorageUsed = allItems
    .filter((item) => item.type === "file" && item.size)
    .reduce((sum, file) => sum + (file.size ?? 0), 0);

  // --- Get Recent Files ---
  const recentFiles = allItems
    .filter((item) => item.type === "file")
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, 5); // Get the 5 most recent files

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Files</CardTitle>
            <File className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFiles}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Folders</CardTitle>
            <Folder className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFolders}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatBytes(totalStorageUsed)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Files Table */}
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Recent Files</h2>
        <Card className="mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Last Modified</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentFiles.length > 0 ? (
                recentFiles.map((file) => (
                  <TableRow key={file.id}>
                    <TableCell className="font-medium">{file.name}</TableCell>
                    <TableCell>
                      {new Date(file.updatedAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    No recent files.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
