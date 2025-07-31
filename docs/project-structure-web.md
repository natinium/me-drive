# MeDrive Web - Next.js Project Structure

## Overview

Production-grade folder structure for the Next.js web application following industry best practices and the technical specifications from the spec sheet.

## Root Structure

```
apps/web/
├── .next/                    # Next.js build output (auto-generated)
├── public/                   # Static assets served directly
│   ├── favicon.ico          # Application favicon
│   ├── robots.txt          # SEO robots configuration
│   ├── sitemap.xml         # SEO sitemap
│   └── images/             # Static images (logos, icons, etc.)
│       ├── logo.svg
│       └── placeholders/
├── src/
│   ├── app/                 # App Router (Next.js 13+)
│   │   ├── (auth)/          # Authentication routes group
│   │   │   ├── login/       # Login page
│   │   │   │   └── page.tsx
│   │   │   ├── signup/      # Signup page
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx   # Auth layout wrapper
│   │   ├── (main)/          # Main application routes group
│   │   │   ├── dashboard/   # Dashboard page
│   │   │   │   └── page.tsx
│   │   │   ├── drive/       # My Drive page
│   │   │   │   ├── [folderId]/  # Dynamic folder route
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx     # Root drive page
│   │   │   ├── layout.tsx   # Main layout with sidebar
│   │   │   └── loading.tsx  # Main area loading state
│   │   ├── api/             # API routes (if needed)
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Marketing landing page
│   ├── components/          # React components
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── button.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   └── ...
│   │   ├── layout/          # Layout components
│   │   │   ├── sidebar.tsx
│   │   │   ├── navbar.tsx
│   │   │   └── main-layout.tsx
│   │   ├── features/        # Feature-specific components
│   │   │   ├── auth/
│   │   │   │   ├── login-form.tsx
│   │   │   │   └── signup-form.tsx
│   │   │   ├── dashboard/
│   │   │   │   ├── stat-cards.tsx
│   │   │   │   ├── recent-files.tsx
│   │   │   │   └── storage-usage.tsx
│   │   │   ├── drive/
│   │   │   │   ├── file-table.tsx
│   │   │   │   ├── file-row.tsx
│   │   │   │   ├── folder-breadcrumbs.tsx
│   │   │   │   ├── upload-modal.tsx
│   │   │   │   └── create-folder-modal.tsx
│   │   │   ├── marketing/
│   │   │   │   ├── hero-section.tsx
│   │   │   │   ├── features-section.tsx
│   │   │   │   ├── testimonials-section.tsx
│   │   │   │   ├── pricing-section.tsx
│   │   │   │   ├── faq-section.tsx
│   │   │   │   └── cta-section.tsx
│   │   │   └── shared/
│   │   │       ├── new-button-dropdown.tsx
│   │   │       └── file-icon.tsx
│   │   └── providers/       # Context providers
│   │       ├── theme-provider.tsx
│   │       └── query-provider.tsx
│   ├── lib/                 # Utility functions
│   │   ├── utils.ts         # General utilities
│   │   ├── api.ts           # API client configuration
│   │   ├── auth.ts          # Auth utilities
│   │   └── constants.ts     # App constants
│   ├── hooks/               # Custom React hooks
│   │   ├── use-auth.ts
│   │   ├── use-files.ts
│   │   ├── use-folders.ts
│   │   └── use-storage.ts
│   ├── stores/              # Zustand stores
│   │   ├── auth-store.ts
│   │   ├── file-store.ts
│   │   └── ui-store.ts
│   ├── types/               # TypeScript type definitions
│   │   ├── auth.types.ts
│   │   ├── file.types.ts
│   │   └── api.types.ts
│   ├── config/              # Configuration files
│   │   ├── site.config.ts   # Site configuration
│   │   └── api.config.ts    # API endpoints
│   └── styles/              # Additional styles
│       └── components.css   # Component-specific styles
├── tests/                   # Test files
│   ├── unit/               # Unit tests
│   │   ├── components/
│   │   └── lib/
│   ├── integration/        # Integration tests
│   └── e2e/               # E2E tests with Playwright
│       ├── fixtures/
│       ├── tests/
│       └── playwright.config.ts
├── .env.local              # Local environment variables
├── .env.example            # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
└── README.md               # Web app documentation
```

## Key Directories Explained

### `src/app/`

- **(auth)**: Route group for authentication pages, ensuring clean URL structure.
- **(main)**: Route group for authenticated pages, includes sidebar and main layout.
- **drive/[folderId]**: Dynamic routing for nested folder navigation.

### `src/components/`

- **ui/**: Reusable UI components from shadcn/ui, customized for the app.
- **layout/**: Layout components that structure the application.
- **features/**: Feature-specific components organized by domain (auth, dashboard, drive).

### `src/lib/`

- Centralized location for utility functions, API clients, and constants.
- Follows separation of concerns with dedicated files for different domains.

### `src/stores/`

- Zustand stores for global state management.
- Organized by feature domain for maintainability.

### `tests/`

- Comprehensive testing structure following TDD approach.
- Separate directories for unit, integration, and E2E tests.

## Environment Variables

```bash
# Required for web app
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Scripts

```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "vitest",
  "test:ui": "vitest --ui",
  "test:e2e": "playwright test",
  "type-check": "tsc --noEmit"
}
```
