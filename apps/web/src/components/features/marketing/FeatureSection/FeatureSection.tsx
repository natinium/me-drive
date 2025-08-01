import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Lock, Share2 } from "lucide-react";

export const FeatureSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 flex items-center justify-center">
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
        </div>
      </div>
    </section>
  );
};
