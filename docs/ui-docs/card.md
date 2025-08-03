---
title: Card
description: Displays a card with header, content, and footer.
component: true
---

# Card

Displays a card with header, content, and footer.

import { Button } from "@/components/ui/button"
import {
Card,
CardAction,
CardContent,
CardDescription,
CardFooter,
CardHeader,
CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function CardDemo() {
return (
<Card className="w-full max-w-sm">
<CardHeader>
<CardTitle>Login to your account</CardTitle>
<CardDescription>
Enter your email below to login to your account
</CardDescription>
<CardAction>
<Button variant="link">Sign Up</Button>
</CardAction>
</CardHeader>
<CardContent>
<form>
<div className="flex flex-col gap-6">
<div className="grid gap-2">
<Label htmlFor="email">Email</Label>
<Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
</div>
<div className="grid gap-2">
<div className="flex items-center">
<Label htmlFor="password">Password</Label>
<a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
Forgot your password?
</a>
</div>
<Input id="password" type="password" required />
</div>
</div>
</form>
</CardContent>
<CardFooter className="flex-col gap-2">
<Button type="submit" className="w-full">
Login
</Button>
<Button variant="outline" className="w-full">
Login with Google
</Button>
</CardFooter>
</Card>
)
}

## Installation

```bash
npx shadcn@latest add card
```

Update the import paths to match your project setup.

## Usage

```tsx showLineNumbers
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
```

```tsx showLineNumbers
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
    <CardAction>Card Action</CardAction>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
```
