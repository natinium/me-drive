// vitest.setup.ts
import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import React from "react";

// Mock next/server to prevent issues with next-auth
vi.mock("next/server", () => ({
  NextResponse: vi.fn(),
}));

// Mock next-auth to avoid issues with its internal dependencies
vi.mock("next-auth", () => ({
  default: vi.fn(() => ({
    // Mock the necessary exports from next-auth
    handlers: {
      GET: vi.fn(),
      POST: vi.fn(),
    },
    signIn: vi.fn(),
    signOut: vi.fn(),
    auth: vi.fn(() => null), // Mock auth to return null session by default
  })),
}));

// Mock next-auth/react for components using useSession
vi.mock("next-auth/react", () => ({
  useSession: vi.fn(() => ({
    data: {
      user: { id: "1", name: "Test User", email: "test@example.com" },
      accessToken: "test-token",
    },
    status: "authenticated",
  })),
  getSession: vi.fn(),
}));

// Mock useSessionContext from src/components/providers/session-provider.tsx
vi.mock("@/components/providers/session-provider", async (importOriginal) => {
  const actual = await importOriginal();
  const mockSession = {
    session: {
      user: { id: "1", name: "Test User", email: "test@example.com" },
      accessToken: "test-token",
    },
    status: "authenticated",
  };

  return {
    ...actual,
    useSessionContext: vi.fn(() => ({
      session: mockSession.session,
      setSession: vi.fn(),
    })),
    Providers: vi.fn(({ children }) =>
      React.createElement(
        actual.SessionContext.Provider,
        {
          value: {
            session: mockSession.session,
            setSession: vi.fn(),
          },
        },
        children,
      ),
    ),
  };
});

// Mock SidebarProvider and useSidebar from src/components/ui/sidebar.tsx
vi.mock("@/components/ui/sidebar", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useSidebar: vi.fn(() => ({
      isOpen: false,
      setIsOpen: vi.fn(),
      toggleSidebar: vi.fn(),
    })),
    SidebarProvider: vi.fn(({ children }) => children),
    Sidebar: vi.fn(({ children }) =>
      React.createElement("div", { "data-testid": "mock-sidebar" }, children),
    ),
    SidebarTrigger: vi.fn(() =>
      React.createElement("button", { "data-testid": "mock-sidebar-trigger" }),
    ),
  };
});

// Mock next/router for components using useRouter
vi.mock("next/router", () => ({
  useRouter: vi.fn(() => ({
    route: "/",
    pathname: "",
    query: "",
    asPath: "",
    push: vi.fn(),
    replace: vi.fn(),
    reload: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
    isFallback: false,
  })),
}));

// Mock next/navigation for components using useRouter, usePathname, useSearchParams
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  })),
  usePathname: vi.fn(() => "/"),
  useSearchParams: vi.fn(() => new URLSearchParams()),
}));
