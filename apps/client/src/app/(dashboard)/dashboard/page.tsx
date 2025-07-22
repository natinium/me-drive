import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { File, Folder, HardDrive, Users } from "lucide-react";

// In a real app, this data would come from an API call
const getDashboardData = async () => {
  return {
    stats: {
      totalFiles: 125,
      storageUsed: 5.6, // in GB
      storageTotal: 15, // in GB
      sharedWith: 3,
    },
    recentItems: [
      {
        id: "file1",
        name: "Q4_Financial_Report.xlsx",
        type: "file",
        lastModified: "2 hours ago",
      },
      {
        id: "folder1",
        name: "Project Alpha",
        type: "folder",
        lastModified: "8 hours ago",
      },
      {
        id: "file2",
        name: "Onboarding_Slides.pptx",
        type: "file",
        lastModified: "1 day ago",
      },
      {
        id: "file3",
        name: "company-logo-final.svg",
        type: "file",
        lastModified: "3 days ago",
      },
      {
        id: "folder2",
        name: "Client Invoices",
        type: "folder",
        lastModified: "5 days ago",
      },
    ],
  };
};

export default async function DashboardPage() {
  const session = await auth();
  const data = await getDashboardData();
  const storagePercentage =
    (data.stats.storageUsed / data.stats.storageTotal) * 100;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {session?.user?.name?.split(" ")[0] || "User"}!
        </h1>
        <p className="text-muted-foreground">
          Here&apos;s a quick overview of your drive.
        </p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Files & Folders
            </CardTitle>
            <File className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.stats.totalFiles}</div>
            <p className="text-xs text-muted-foreground">+2 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.stats.storageUsed} GB
            </div>
            <p className="text-xs text-muted-foreground">
              {storagePercentage.toFixed(1)}% of {data.stats.storageTotal} GB
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Shared With Me
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              +{data.stats.sharedWith} items
            </div>
            <p className="text-xs text-muted-foreground">
              From 2 collaborators
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Files Card */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Files</CardTitle>
          <CardDescription>
            A list of your most recently accessed or modified files and folders.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.recentItems.map((item) => (
              <div key={item.id} className="flex items-center">
                {item.type === "folder" ? (
                  <Folder className="h-5 w-5 mr-4 text-blue-500" />
                ) : (
                  <File className="h-5 w-5 mr-4 text-gray-500" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium leading-none">
                    {item.name}
                  </p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">
                  {item.lastModified}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
