---
title: Input
description: Displays a form input field or a component that looks like an input field.
component: true
---

# Input

Displays a form input field or a component that looks like an input field.

```tsx
import { Input } from "@/components/ui/input";

export function InputDemo() {
  return <Input type="email" placeholder="Email" />;
}
```

## Installation

```bash
npx shadcn@latest add input
```

## Usage

```tsx
import { Input } from "@/components/ui/input";
```

```tsx
<Input />
```

## Examples

### Default

import { Input } from "@/components/ui/input"

export function InputDemo() {
return <Input type="email" placeholder="Email" />
}

### File

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputFile() {
return (

<div className="grid w-full max-w-sm items-center gap-3">
<Label htmlFor="picture">Picture</Label>
<Input id="picture" type="file" />
</div>
)
}

### Disabled

import { Input } from "@/components/ui/input"

export function InputDisabled() {
return <Input disabled type="email" placeholder="Email" />
}

### With Label

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InputWithLabel() {
return (

<div className="grid w-full max-w-sm items-center gap-3">
<Label htmlFor="email">Email</Label>
<Input type="email" id="email" placeholder="Email" />
</div>
)
}

### With Button

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function InputWithButton() {
return (

<div className="flex w-full max-w-sm items-center gap-2">
<Input type="email" placeholder="Email" />
<Button type="submit" variant="outline">
Subscribe
</Button>
</div>
)
}

### Form

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
Form,
FormControl,
FormDescription,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const FormSchema = z.object({
username: z.string().min(2, {
message: "Username must be at least 2 characters.",
}),
})

export function InputForm() {
const form = useForm<z.infer<typeof FormSchema>>({
resolver: zodResolver(FormSchema),
defaultValues: {
username: "",
},
})

function onSubmit(data: z.infer<typeof FormSchema>) {
toast("You submitted the following values", {
description: (

<pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
<code className="text-white">{JSON.stringify(data, null, 2)}</code>
</pre>

),
})
}

return (

<Form {...form}>
<form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
<FormField
control={form.control}
name="username"
render={({ field }) => (
<FormItem>
<FormLabel>Username</FormLabel>
<FormControl>
<Input placeholder="shadcn" {...field} />
</FormControl>
<FormDescription>
This is your public display name.
</FormDescription>
<FormMessage />
</FormItem>
)}
/>
<Button type="submit">Submit</Button>
</form>
</Form>
)
}
