# MeDrive

MeDrive is a modern, self-hostable cloud file hosting platform inspired by Google Drive. Built as a full-stack monorepo, it features a Next.js frontend, a Nest.js backend, and a documentation site—all managed with Turborepo for scalable development.

![CI](https://github.com/your-username/medrive/actions/workflows/ci.yaml/badge.svg)
![Release](https://github.com/your-username/medrive/actions/workflows/release.yaml/badge.svg)

## 🚀 Features

- **User Authentication**: Secure login/signup with JWT.
- **Dashboard**: Stats and recently accessed files.
- **My Drive**: File/folder management with nested folders.
- **File Uploads**: Upload, organize, and preview files.
- **Modern UI**: Built with Tailwind CSS and shadcn/ui.
- **Self-Hostable**: Easily deploy on your own infrastructure.
- **API-first**: RESTful API with JWT auth, pagination, and more.
- **Monorepo**: Shared code, unified tooling, and fast CI/CD.

## 🏗️ Architecture

**Monorepo Structure:**

```
apps/
  web/        # Next.js frontend
  server/     # Nest.js backend
  docs/       # Documentation site
packages/
  ui/         # Shared React UI components
  eslint-config/ # Shared ESLint config
  typescript-config/ # Shared TS config
```

**Tech Stack:**

- **Frontend**: Next.js, Tailwind CSS, shadcn/ui, Zustand, TanStack Query, React Hook Form
- **Backend**: Nest.js, Prisma ORM, PostgreSQL, Cloudinary (file storage)
- **Auth**: NextAuth.js (web), JWT (server)
- **Testing**: Vitest, Playwright, Jest
- **Tooling**: Turborepo, ESLint, Prettier, Husky, lint-staged

## 📦 Apps & Packages

- `apps/web`: Main Next.js web app (user interface)
- `apps/server`: Nest.js API backend
- `apps/docs`: Documentation site (Next.js)
- `packages/ui`: Shared React component library
- `packages/eslint-config`: Shared ESLint config
- `packages/typescript-config`: Shared TS config

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18
- Yarn 1.x

### Install dependencies

```sh
yarn install
```

### Development

Start all apps in development mode:

```sh
yarn dev
```

### Build

Build all apps and packages:

```sh
yarn build
```

### Lint & Format

```sh
yarn lint
yarn format
```

### Test

```sh
yarn test
```

## 🔧 Environment Setup

Before running the applications, you need to set up environment variables:

1. For the web app:

   ```bash
   cp apps/web/.env.example apps/web/.env
   # Edit apps/web/.env with your configuration
   ```

2. For the server app:
   ```bash
   cp apps/server/.env.example apps/server/.env
   # Edit apps/server/.env with your configuration
   ```

## 🚀 Deployment

### Web App (Vercel)

1. Push to a GitHub repository
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard

### Server App (Render)

1. Push to a GitHub repository
2. Connect your repository to Render
3. Set environment variables in Render dashboard

## 📚 Documentation

- [Product Requirements](./docs/prd.md)
- [API Reference](./docs/api-documentation.md)
- [Web App Structure](./docs/project-structure-web.md)
- [Server Structure](./docs/project-structure-server.md)
- [Spec Sheet](./docs/spec-sheet.md)
- [Roadmap](./docs/roadmap.md)

## 📝 License

This project is licensed under the MIT License.
