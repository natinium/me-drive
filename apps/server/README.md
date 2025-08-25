# MeDrive Server

This is the backend API for MeDrive, built with Nest.js and Prisma.

## Tech Stack

- [Nest.js](https://nestjs.com/) - Progressive Node.js framework
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [PostgreSQL](https://www.postgresql.org/) - Open source relational database
- [Supabase](https://supabase.com/) - Backend-as-a-service platform

## Features

- RESTful API with JWT authentication
- User management
- File and folder management
- File sharing capabilities
- Database migrations with Prisma

## Development

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Set up environment variables:

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. Run database migrations:

   ```bash
   yarn prisma migrate dev
   ```

4. Start the development server:
   ```bash
   yarn dev
   ```

## Testing

Run unit tests:

```bash
yarn test
```

Run end-to-end tests:

```bash
yarn test:e2e
```
