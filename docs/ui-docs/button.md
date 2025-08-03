---
title: Button
description: Displays a button or a component that looks like a button.
---

# Button

Displays a button or a component that looks like a button.

## Installation

```bash
npx shadcn@latest add button
```

Install the following dependencies:

```bash
npm install @radix-ui/react-slot
```

## Usage

```tsx
import { Button } from "@/components/ui/button";
```

```tsx
<Button variant="outline">Button</Button>
```

## Link

You can use the `asChild` prop to make another component look like a button. Here's an example of a link that looks like a button.

```tsx showLineNumbers
import { Link } from "next/link";

import { Button } from "@/components/ui/button";

export function LinkAsButton() {
  return (
    <Button asChild>
      <Link href="/login">Login</Link>
    </Button>
  );
}
```

## Examples

### Default

import { Button } from "@/components/ui/button"

export function ButtonDemo() {
return (
<div className="flex flex-wrap items-center gap-2 md:flex-row">
<Button>Button</Button>
</div>
)
}

### Secondary

import { Button } from "@/components/ui/button"

export function ButtonSecondary() {
return <Button variant="secondary">Secondary</Button>
}

### Destructive

import { Button } from "@/components/ui/button"

export function ButtonDestructive() {
return <Button variant="destructive">Destructive</Button>
}

### Outline

import { Button } from "@/components/ui/button"

export function ButtonOutline() {
return <Button variant="outline">Outline</Button>
}

### Ghost

import { Button } from "@/components/ui/button"

export function ButtonGhost() {
return <Button variant="ghost">Ghost</Button>
}

### Link

import { Button } from "@/components/ui/button"

export function ButtonLink() {
return <Button variant="link">Link</Button>
}

### Icon

import { ChevronRightIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonIcon() {
return (
<Button variant="secondary" size="icon" className="size-8">
<ChevronRightIcon />
</Button>
)
}

### With Icon

import { IconGitBranch } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

export function ButtonWithIcon() {
return (
<Button variant="outline" size="sm">
<IconGitBranch /> New Branch
</Button>
)
}

### Loading

import { Loader2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"

export function ButtonLoading() {
return (
<Button size="sm" disabled>
<Loader2Icon className="animate-spin" />
Please wait
</Button>
)
}
