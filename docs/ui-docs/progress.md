---
title: Progress
description: Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.
component: true
links:
  doc: https://www.radix-ui.com/docs/primitives/components/progress
  api: https://www.radix-ui.com/docs/primitives/components/progress#api-reference
---

# Progress

Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.

"use client"

import \* as React from "react"

import { Progress } from "@/components/ui/progress"

export function ProgressDemo() {
const [progress, setProgress] = React.useState(13)

React.useEffect(() => {
const timer = setTimeout(() => setProgress(66), 500)
return () => clearTimeout(timer)
}, [])

return <Progress value={progress} className="w-[60%]" />
}

## Installation

<CodeTabs>

```bash
npx shadcn@latest add progress
```

<Step>Install the following dependencies:</Step>

```bash
npm install @radix-ui/react-progress
```

## Usage

```tsx showLineNumbers
import { Progress } from "@/components/ui/progress";
```

```tsx showLineNumbers
<Progress value={33} />
```
