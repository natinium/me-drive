import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, File, FolderPlus } from "lucide-react";

interface FileUploadZoneProps {
  onFileUpload?: (files: File[]) => void;
  onFolderCreate?: () => void;
}

export const FileUploadZone = ({
  onFileUpload,
  onFolderCreate,
}: FileUploadZoneProps) => {
  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    onFileUpload?.(files);
  };

  return (
    <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <Upload className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">
          Upload files or create folder
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Drag and drop files here or click to browse
        </p>
        <div className="flex gap-2">
          <input
            type="file"
            multiple
            className="hidden"
            id="file-upload"
            onChange={handleFileInput}
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById("file-upload")?.click()}
          >
            <File className="h-4 w-4 mr-2" />
            Upload Files
          </Button>
          <Button variant="outline" onClick={onFolderCreate}>
            <FolderPlus className="h-4 w-4 mr-2" />
            New Folder
          </Button>
        </div>
      </div>
    </Card>
  );
};
