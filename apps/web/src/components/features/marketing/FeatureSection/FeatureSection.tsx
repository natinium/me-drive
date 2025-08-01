import { Cloud, Lock, Share2 } from "lucide-react";

export const FeatureSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Everything You Need in a Cloud Storage
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              From secure file storage to seamless sharing, MeDrive offers a
              comprehensive suite of features to manage your digital life.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-6 py-12 lg:gap-12">
          <div className="w-full lg:w-1/3 text-center flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-2">
              <Cloud className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold">File Storage</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Securely upload, store, and organize your files in the cloud.
              Access them from any device, anywhere.
            </p>
          </div>
          <div className="w-full lg:w-1/3 text-center flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-2">
              <Share2 className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold">Easy Sharing</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Share files and folders with anyone. Control permissions and
              collaborate with ease.
            </p>
          </div>
          <div className="w-full lg:w-1/3 text-center flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-2">
              <Lock className="h-8 w-8 text-gray-500 dark:text-gray-400" />
              <h3 className="text-xl font-bold">Top-tier Security</h3>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Your files are protected with end-to-end encryption. Your privacy
              is our priority.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
