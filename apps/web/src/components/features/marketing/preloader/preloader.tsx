"use client";

import { useState, useEffect } from "react";
import { Mountain } from "lucide-react";
import styles from "./preloader.module.css";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-bounce">
          <Mountain className="h-16 w-16 text-primary" />
        </div>
        <p className="text-lg font-medium">Loading MeDrive...</p>
      </div>
    </div>
  );
};

export default Preloader;
