# MeDrive - Fullstack Application Specification

## 1. Project Overview

| Field                       | Value                                   |
| :-------------------------- | :-------------------------------------- |
| **Architecture**            | Full-stack monorepo with 3 applications |
| **Frontend Framework**      | Next.js                                 |
| **Backend Framework**       | Nest.js                                 |
| **Documentation**           | Next.js docs app                        |
| **Development Methodology** | Test-Driven Development (TDD)           |
| **Repository Strategy**     | Monorepo with Turborepo                 |

## 2. Application Structure

| Application | Purpose              | Hosting | Framework |
| :---------- | :------------------- | :------ | :-------- |
| **Web**     | Main Next.js web app | Vercel  | Next.js   |
| **Server**  | Nest.js API backend  | Render  | Nest.js   |
| **Docs**    | Documentation site   | Vercel  | Next.js   |

## 3. Tech Stack

### Frontend

| Technology          | Purpose                         |
| :------------------ | :------------------------------ |
| **Next.js**         | React framework                 |
| **Tailwind CSS**    | Utility-first CSS framework     |
| **shadcn/ui**       | Component library               |
| **Zustand**         | State management                |
| **React Context**   | Context API for state           |
| **React Hooks**     | React hooks for state/lifecycle |
| **Zod**             | Schema validation               |
| **TanStack Query**  | Data fetching & caching         |
| **React Hook Form** | Form handling                   |
| **TanStack Table**  | Data tables                     |
| **Vitest**          | unit testing                    |
| **Playwright**      | e2e testing                     |
| **Storybook**       | Component development           |
| **next-themes**     | for app theme                   |
| **Auth.js**         | authentication                  |

### Backend

| Technology     | Purpose                     |
| :------------- | :-------------------------- |
| **Nest.js**    | Node.js framework           |
| **Supabase**   | Database & backend services |
| **Prisma**     | ORM for database            |
| **Jest**       | Backend testing framework   |
| **Cloudinary** | File storage                |

### Authentication

| Provider          | Methods                  |
| :---------------- | :----------------------- |
| **Auth.js**       | Email & password         |
| **Firebase Auth** | Additional auth provider |

### Testing

| Framework      | Application | Purpose                  |
| :------------- | :---------- | :----------------------- |
| **Vitest**     | Frontend    | Unit & integration tests |
| **Playwright** | Frontend    | E2E tests                |
| **Jest**       | Backend     | Unit & integration tests |

## 4. Development Workflow

### Git Strategy

| Component              | Configuration        |
| :--------------------- | :------------------- |
| **Commit Convention**  | Conventional commits |
| **Commit Linting**     | commitlint           |
| **Pre-commit Hooks**   | lint-staged          |
| **Release Management** | semantic-release     |

### CI/CD Pipeline

| Service            | Purpose           |
| :----------------- | :---------------- |
| **GitHub Actions** | CI/CD pipeline    |
| **Vercel**         | Deploy web & docs |
| **Render**         | Deploy server     |

## 5. Development Process Plan

### Phase 1: Repository Setup

1. Initialize Turborepo monorepo
2. Configure workspace structure
3. Set up GitHub repository
4. Configure commitlint & husky
5. Set up lint-staged
6. Configure TypeScript

### Phase 2: Development Environment

1. Configure environment variables
2. Set up Supabase project
3. Configure Prisma with Supabase
4. Set up Firebase project
5. Configure Auth.js
6. Set up testing frameworks

### Phase 3: CI/CD Setup

1. Configure GitHub Actions workflows
2. Set up Vercel deployments
3. Configure Render deployment
4. Set up semantic-release
5. Configure branch protection rules

### Phase 4: Application Development (TDD Cycle)

1. Write failing tests first
2. Implement minimal code to pass tests
3. Refactor and optimize
4. Repeat for each feature

### Phase 5: Testing Strategy

1. Unit tests for individual components/functions
2. Integration tests for API endpoints
3. E2E tests for critical user flows
4. Performance testing
5. Security testing

## 6. Directory Structure

```
monorepo-root/
├── apps/
│   ├── web/             # Next.js client app
│   ├── server/          # Nest.js API server
│   └── docs/            # Next.js documentation
├── packages/
│   ├── ui/              # Shared UI components
│   ├── types/           # Shared TypeScript types
│   └── utils/           # Shared utilities
├── .github/
│   └── workflows/       # GitHub Actions
├── turbo.json           # Turborepo configuration
└── package.json
```

## 7. Environment Configuration

### Required Environment Variables

| Variable               | Application | Purpose              |
| :--------------------- | :---------- | :------------------- |
| `NEXT_PUBLIC_API_URL`  | web         | Backend API endpoint |
| `SUPABASE_URL`         | Server      | Supabase connection  |
| `SUPABASE_SERVICE_KEY` | Server      | Supabase service key |
| `FIREBASE_API_KEY`     | Client      | Firebase auth        |
| `FIREBASE_PROJECT_ID`  | Client      | Firebase project     |
| `NEXTAUTH_URL`         | Client      | Auth.js URL          |
| `NEXTAUTH_SECRET`      | Client      | Auth.js secret       |

## 8. Next Steps

1. Set up the monorepo structure
2. Initialize each application
3. Configure development tooling
4. Create initial test suites
5. Set up deployment pipelines
6. Begin TDD development cycle
