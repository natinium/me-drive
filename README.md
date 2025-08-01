```bash

```

````bash
```bash
````

````bash
```bash
````

````bash
```bash
````

````bash
```bash
````

```bash
# MeDrive

MeDrive is a modern, self-hostable cloud file hosting platform inspired by Google Drive. Built as a full-stack monorepo, it features a Next.js frontend, a Nest.js backend, and a documentation site—all managed with Turborepo for scalable development.

---

## 🚀 Features

- **User Authentication**: Secure login/signup with JWT.
- **Dashboard**: Stats and recently accessed files.
- **My Drive**: File/folder management with nested folders.
- **File Uploads**: Upload, organize, and preview files.
- **Modern UI**: Built with Tailwind CSS and shadcn/ui.
- **Self-Hostable**: Easily deploy on your own infrastructure.
- **API-first**: RESTful API with JWT auth, pagination, and more.
- **Monorepo**: Shared code, unified tooling, and fast CI/CD.

---

## 🏗️ Architecture

**Monorepo Structure:**

```

apps/
web/ # Next.js frontend
server/ # Nest.js backend
docs/ # Documentation site
packages/
ui/ # Shared React UI components
eslint-config/ # Shared ESLint config
typescript-config/ # Shared TS config

````

**Tech Stack:**

- **Frontend**: Next.js, Tailwind CSS, shadcn/ui, Zustand, TanStack Query, React Hook Form
- **Backend**: Nest.js, Prisma ORM, Supabase (PostgreSQL), Cloudinary (file storage)
- **Auth**: NextAuth.js (web), JWT (server)
- **Testing**: Vitest, Playwright, Jest
- **Tooling**: Turborepo, ESLint, Prettier, Husky, lint-staged

---

## 📦 Apps & Packages

- `apps/web`: Main Next.js web app (user interface)
- `apps/server`: Nest.js API backend
- `apps/docs`: Documentation site (Next.js)
- `packages/ui`: Shared React component library
- `packages/eslint-config`: Shared ESLint config
- `packages/typescript-config`: Shared TS config

---

## 🛠️ Getting Started

### Prerequisites

- Node.js >= 18
- Yarn 1.x

### Install dependencies

```sh
yarn install
````

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

---

## 📚 Documentation

- [Product Requirements](./docs/prd.md)
- [API Reference](./docs/api-documentation.md)
- [Web App Structure](./docs/project-structure-web.md)
- [Server Structure](./docs/project-structure-server.md)
- [Spec Sheet](./docs/spec-sheet.md)
- [Roadmap](./docs/roadmap.md)

---

## 📝 License

This project is licensed under the MIT License.

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)

turbo build

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager

### Build with Turbo

```bash
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build
# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build
yarn dlx turbo build
pnpm exec turbo build
```

```bash

```

```bash

```

You can build a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

````

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)

turbo build --filter=docs

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager

### Build Docs Only

```bash
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo build --filter=docs
# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo build --filter=docs
yarn exec turbo build --filter=docs
pnpm exec turbo build --filter=docs
````

```bash

```

```bash

```

### Develop

To develop all apps and packages, run the following command:

````

cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)

turbo dev

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager

### Develop

```bash
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev
# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev
yarn exec turbo dev
pnpm exec turbo dev
````

```bash

```

```bash

```

You can develop a specific package by using a [filter](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters):

````

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)

turbo dev --filter=web

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager

### Develop Web Only

```bash
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo dev --filter=web
# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo dev --filter=web
yarn exec turbo dev --filter=web
pnpm exec turbo dev --filter=web
````

```bash

```

```bash

```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

````

cd my-turborepo

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)

turbo login

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager

### Turbo Login

```bash
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo login
# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo login
yarn exec turbo login
pnpm exec turbo login
````

```bash

```

```bash

```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

````

# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)

turbo link

# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager

### Turbo Link

```bash
# With [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation) installed (recommended)
turbo link
# Without [global `turbo`](https://turborepo.com/docs/getting-started/installation#global-installation), use your package manager
npx turbo link
yarn exec turbo link
pnpm exec turbo link
````

```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Remote Caching](https://turborepo.com/docs/core-concepts/remote-caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)
- [Configuration Options](https://turborepo.com/docs/reference/configuration)
- [CLI Usage](https://turborepo.com/docs/reference/command-line-reference)
```
