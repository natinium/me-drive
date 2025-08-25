import React from "react";
import { File, Folder, Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import styles from "./empty-state.module.css";

interface EmptyStateProps {
  type?: "files" | "folders" | "search" | "upload";
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const EmptyState = ({
  type = "files",
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  const getIcon = () => {
    switch (type) {
      case "folders":
        return <Folder className="h-12 w-12" />;
      case "search":
        return <Search className="h-12 w-12" />;
      case "upload":
        return <Upload className="h-12 w-12" />;
      default:
        return <File className="h-12 w-12" />;
    }
  };

  const getDefaultTitle = () => {
    switch (type) {
      case "folders":
        return "No folders found";
      case "search":
        return "No results found";
      case "upload":
        return "Upload your first file";
      default:
        return "No files found";
    }
  };

  const getDefaultDescription = () => {
    switch (type) {
      case "folders":
        return "Create a new folder to get started.";
      case "search":
        return "Try searching with different keywords.";
      case "upload":
        return "Drag and drop files here or click to browse.";
      default:
        return "Upload files or create folders to get started.";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-muted text-muted-foreground mb-4">
        {getIcon()}
      </div>
      <h3 className="text-lg font-semibold mb-2">
        {title || getDefaultTitle()}
      </h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-sm">
        {description || getDefaultDescription()}
      </p>
      {onAction && actionLabel && (
        <Button onClick={onAction} variant="outline">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
