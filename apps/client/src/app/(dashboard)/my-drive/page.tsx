import { auth } from "@/auth" // We need the session for the auth token
import { columns, DriveItem } from "./columns"
import { DataTable } from "./data-table"
import { redirect } from "next/navigation"

// This function fetches data from your protected API endpoint
async function getDriveData(): Promise<DriveItem[]> {
  const session = await auth()
  
  // If no session, the user isn't logged in. You can redirect them.
  // The middleware should handle this, but it's good practice.
  if (!session?.accessToken) {
    redirect("/auth/login")
  }

  try {
    const response = await fetch(`${process.env.API_URL}/files`, {
      headers: {
        // We must include the Authorization header to access protected routes
        Authorization: `Bearer ${session.accessToken}`,
      },
      // Use 'no-store' to ensure data is fresh on every request
      cache: 'no-store', 
    });

    if (!response.ok) {
      // Handle API errors (e.g., token expired, server down)
      console.error("Failed to fetch drive data:", response.statusText)
      return [] // Return empty array on error
    }

    const data = await response.json()
    // You might need to add a 'type' property if your API doesn't provide it
    // For now, let's assume it does. If not, you'd map over `data` here.
    return data as DriveItem[]
    
  } catch (error) {
    console.error("Error in getDriveData:", error)
    return []
  }
}

export default async function MyDrivePage() {
  const data = await getDriveData()

  return (
    // Add some padding and a title to the page
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight">My Drive</h1>
      <p className="text-sm text-muted-foreground">
        All your files and folders.
      </p>
      <DataTable columns={columns} data={data} />
    </div>
  )
}