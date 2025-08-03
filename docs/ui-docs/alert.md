---
title: Alert
description: Displays a callout for user attention.
---

# Alert

Displays a callout for user attention.

## Installation

```bash
npx shadcn@latest add alert
```

## Usage

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
```

```tsx
<Alert variant="default | destructive">
  <Terminal />
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components and dependencies to your app using the cli.
  </AlertDescription>
</Alert>
```
