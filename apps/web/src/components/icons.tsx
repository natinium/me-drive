import { ChevronLeft, type Icon as LucideIcon } from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  logo: (props: any) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.29 9 12 15 20.71 9" />
      <line x1="12" y1="22.08" x2="12" y2="15" />
    </svg>
  ),
  chevronLeft: ChevronLeft,
};
