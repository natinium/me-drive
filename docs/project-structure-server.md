# MeDrive Server - Nest.js Project Structure

## Overview

Production-grade folder structure for the Nest.js server application, designed for scalability, maintainability, and following Nest.js best practices.

## Root Structure

```
apps/server/
├── dist/                    # Compiled JavaScript output
├── src/
│   ├── main.ts             # Application entry point
│   ├── app.module.ts       # Root application module
│   ├── config/             # Configuration module
│   │   ├── config.module.ts
│   │   ├── configuration.ts    # Environment configuration
│   │   ├── database.config.ts  # Database configuration
│   │   ├── auth.config.ts      # Auth configuration
│   │   └── storage.config.ts   # File storage configuration
│   ├── common/             # Shared/common code
│   │   ├── decorators/     # Custom decorators
│   │   │   ├── roles.decorator.ts
│   │   │   └── current-user.decorator.ts
│   │   ├── filters/        # Exception filters
│   │   │   ├── http-exception.filter.ts
│   │   │   └── prisma-exception.filter.ts
│   │   ├── guards/         # Auth guards
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── ownership.guard.ts
│   │   ├── interceptors/   # Request/response interceptors
│   │   │   ├── logging.interceptor.ts
│   │   │   └── transform.interceptor.ts
│   │   ├── pipes/          # Validation pipes
│   │   │   ├── validation.pipe.ts
│   │   │   └── file-validation.pipe.ts
│   │   ├── dtos/           # Common DTOs
│   │   │   └── pagination.dto.ts
│   │   ├── entities/       # Common entities
│   │   └── utils/          # Utility functions
│   │       ├── crypto.util.ts
│   │       └── file.util.ts
│   ├── modules/            # Feature modules
│   │   ├── auth/
│   │   │   ├── auth.module.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.spec.ts
│   │   │   ├── strategies/
│   │   │   │   ├── jwt.strategy.ts
│   │   │   │   ├── jwt-refresh.strategy.ts
│   │   │   │   └── local.strategy.ts
│   │   │   ├── guards/
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   ├── register.dto.ts
│   │   │   │   └── refresh-token.dto.ts
│   │   │   └── entities/
│   │   │       └── auth.entity.ts
│   │   ├── users/
│   │   │   ├── users.module.ts
│   │   │   ├── users.service.ts
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.spec.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-user.dto.ts
│   │   │   │   ├── update-user.dto.ts
│   │   │   │   └── user-response.dto.ts
│   │   │   └── entities/
│   │   │       └── user.entity.ts
│   │   ├── files/
│   │   │   ├── files.module.ts
│   │   │   ├── files.service.ts
│   │   │   ├── files.controller.ts
│   │   │   ├── files.service.spec.ts
│   │   │   ├── dto/
│   │   │   │   ├── upload-file.dto.ts
│   │   │   │   ├── update-file.dto.ts
│   │   │   │   └── file-response.dto.ts
│   │   │   └── entities/
│   │   │       └── file.entity.ts
│   │   ├── folders/
│   │   │   ├── folders.module.ts
│   │   │   ├── folders.service.ts
│   │   │   ├── folders.controller.ts
│   │   │   ├── folders.service.spec.ts
│   │   │   ├── dto/
│   │   │   │   ├── create-folder.dto.ts
│   │   │   │   ├── update-folder.dto.ts
│   │   │   │   └── folder-response.dto.ts
│   │   │   └── entities/
│   │   │       └── folder.entity.ts
│   │   ├── storage/
│   │   │   ├── storage.module.ts
│   │   │   ├── storage.service.ts
│   │   │   └── providers/
│   │   │       ├── cloudinary.provider.ts
│   │   │       └── local.provider.ts
│   │   └── sharing/
│   │       ├── sharing.module.ts
│   │       ├── sharing.service.ts
│   │       ├── sharing.controller.ts
│   │       ├── dto/
│   │       │   ├── share-file.dto.ts
│   │       │   └── share-response.dto.ts
│   │       └── entities/
│   │           └── share.entity.ts
│   ├── database/            # Database configuration
│   │   ├── prisma.service.ts
│   │   ├── seed.ts          # Database seeding
│   │   └── migrations/      # Prisma migrations
│   ├── middleware/          # Custom middleware
│   │   ├── logger.middleware.ts
│   │   └── cors.middleware.ts
│   └── health/              # Health check endpoints
│       ├── health.controller.ts
│       └── health.service.ts
├── test/                    # E2E tests
│   ├── app.e2e-spec.ts
│   ├── jest-e2e.json
│   └── fixtures/
├── prisma/                  # Prisma ORM
│   ├── schema.prisma        # Database schema
│   └── seed.ts
├── uploads/                 # Local file storage (development)
├── logs/                    # Application logs
├── .env                     # Environment variables
├── .env.example             # Environment template
├── .env.test               # Test environment variables
├── nest-cli.json           # Nest CLI configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.build.json     # Build-specific TypeScript config
├── jest.config.js          # Jest testing configuration
├── package.json            # Dependencies and scripts
├── docker-compose.yml      # Docker services
├── Dockerfile              # Docker configuration
└── README.md               # Server documentation
```

## Key Directories Explained

### `src/config/`

- Centralized configuration management using Nest's ConfigModule
- Environment-specific configurations for database, auth, and storage
- Type-safe configuration validation

### `src/common/`

- Shared code used across multiple modules
- Cross-cutting concerns like logging, validation, and security
- Reusable utilities and decorators

### `src/modules/`

- Feature-based module organization (Domain-Driven Design approach)
- Each module contains its own service, controller, DTOs, and entities
- Clear separation of business logic and API endpoints

### `src/database/`

- Prisma ORM integration
- Database seeding for development
- Migration management

### Module Structure Pattern

Each feature module follows this consistent pattern:

```
module-name/
├── module-name.module.ts    # Module definition
├── module-name.service.ts   # Business logic
├── module-name.controller.ts # REST endpoints
├── module-name.service.spec.ts # Unit tests
├── dto/                     # Data Transfer Objects
├── entities/                # Database entities
└── guards/                  # Module-specific guards
```

## Environment Variables

```bash
# Required for server
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/medrive
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
REDIS_URL=redis://localhost:6379
CORS_ORIGIN=http://localhost:3000
```

## Scripts

```json
{
  "build": "nest build",
  "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
  "start": "nest start",
  "start:dev": "nest start --watch",
  "start:debug": "nest start --debug --watch",
  "start:prod": "node dist/main",
  "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:cov": "jest --coverage",
  "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
  "test:e2e": "jest --config ./test/jest-e2e.json",
  "prisma:generate": "prisma generate",
  "prisma:migrate": "prisma migrate dev",
  "prisma:seed": "ts-node prisma/seed.ts"
}
```

## Docker Support

- **Dockerfile**: Multi-stage build for optimized production images
- **docker-compose.yml**: Development environment with PostgreSQL and Redis
- Health checks and graceful shutdown handling

## Security Features

- JWT-based authentication with refresh tokens
- Role-based access control (RBAC)
- File ownership validation
- Rate limiting on API endpoints
- Input validation with class-validator
- SQL injection prevention with Prisma ORM
