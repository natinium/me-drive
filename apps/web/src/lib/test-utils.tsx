import React from "react";
import { render, RenderOptions } from "@testing-library/react";
import { SidebarProvider } from "@/components/ui/sidebar";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <SidebarProvider>{children}</SidebarProvider>;
};

const customRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
