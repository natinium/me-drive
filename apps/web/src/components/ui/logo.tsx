import { Cloud } from "lucide-react";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-6 w-6" }: LogoProps) {
  return <Cloud className={className} />;
}
