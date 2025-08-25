---
title: Collapsible
description: An interactive component which expands/collapses a panel.
component: true
featured: true
links:
  doc: https://www.radix-ui.com/docs/primitives/components/collapsible
  api: https://www.radix-ui.com/docs/primitives/components/collapsible#api-reference
---

# Collapsible

An interactive component which expands/collapses a panel.

"use client"

import \* as React from "react"
import { ChevronsUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
Collapsible,
CollapsibleContent,
CollapsibleTrigger,
} from "@/components/ui/collapsible"

export function CollapsibleDemo() {
const [isOpen, setIsOpen] = React.useState(false)

return (
<Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-[350px] flex-col gap-2"
    >

<div className="flex items-center justify-between gap-4 px-4">
<h4 className="text-sm font-semibold">
@peduarte starred 3 repositories
</h4>
<CollapsibleTrigger asChild>
<Button variant="ghost" size="icon" className="size-8">
<ChevronsUpDown />
<span className="sr-only">Toggle</span>
</Button>
</CollapsibleTrigger>
</div>
<div className="rounded-md border px-4 py-2 font-mono text-sm">
@radix-ui/primitives
</div>
<CollapsibleContent className="flex flex-col gap-2">
<div className="rounded-md border px-4 py-2 font-mono text-sm">
@radix-ui/colors
</div>
<div className="rounded-md border px-4 py-2 font-mono text-sm">
@stitches/react
</div>
</CollapsibleContent>
</Collapsible>
)
}

## Installation

```bash
npx shadcn@latest add collapsible
```

Install the following dependencies:

```bash
npm install @radix-ui/react-collapsible
```

## Usage

```tsx showLineNumbers
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
```

```tsx showLineNumbers
<Collapsible>
  <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
  <CollapsibleContent>
    Yes. Free to use for personal and commercial projects. No attribution
    required.
  </CollapsibleContent>
</Collapsible>
```
