# MeDrive Web

This is the frontend application for MeDrive, built with Next.js.

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [TanStack Query](https://tanstack.com/query) - Data fetching and caching

## Features

- User authentication (login/signup)
- Dashboard with file statistics
- File and folder management
- File uploading and sharing
- Responsive design

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

3. Start the development server:
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
