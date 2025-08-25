import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Lock, Share2, Folder, Users, HardDrive } from "lucide-react";
import Link from "next/link";
import styles from "./feature-section.module.css";

const FeatureSection = () => {
  return (
    <section
      id="features"
      className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge>Key Features</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Everything You Need in a Cloud Storage
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              From secure file storage to seamless sharing, MeDrive offers a
              comprehensive suite of features to manage your digital life.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-center gap-2">
              <Cloud className="h-8 w-8 text-muted-foreground" />
              <CardTitle>File Storage</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Securely upload, store, and organize your files in the cloud.
              Access them from any device, anywhere.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-center gap-2">
              <Folder className="h-8 w-8 text-muted-foreground" />
              <CardTitle>Folder Management</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Organize your files with nested folders. Create, rename, and
              manage your folder structure with ease.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-center gap-2">
              <Share2 className="h-8 w-8 text-muted-foreground" />
              <CardTitle>Easy Sharing</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Share files and folders with anyone. Control permissions and
              collaborate with ease.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-center gap-2">
              <Lock className="h-8 w-8 text-muted-foreground" />
              <CardTitle>Top-tier Security</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Your files are protected with end-to-end encryption. Your privacy
              is our priority.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-center gap-2">
              <HardDrive className="h-8 w-8 text-muted-foreground" />
              <CardTitle>Self-Hosted</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Keep full control of your data by hosting MeDrive on your own
              servers. No third-party access to your files.
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-center gap-2">
              <Users className="h-8 w-8 text-muted-foreground" />
              <CardTitle>Team Collaboration</CardTitle>
            </CardHeader>
            <CardContent className="text-center text-sm text-muted-foreground">
              Work together with your team. Share folders, assign permissions,
              and collaborate in real-time.
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-8">
          <Link
            href="/features"
            className="inline-flex items-center text-primary hover:underline"
          >
            View all features
            <svg
              className="ml-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
