---
title: Dialog
description: A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.
featured: true
component: true
links:
  doc: https://www.radix-ui.com/docs/primitives/components/dialog
  api: https://www.radix-ui.com/docs/primitives/components/dialog#api-reference
---

# Dialog

A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.

import { Button } from "@/components/ui/button"
import {
Dialog,
DialogClose,
DialogContent,
DialogDescription,
DialogFooter,
DialogHeader,
DialogTitle,
DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DialogDemo() {
return (
<Dialog>
<form>
<DialogTrigger asChild>
<Button variant="outline">Open Dialog</Button>
</DialogTrigger>
<DialogContent className="sm:max-w-[425px]">
<DialogHeader>
<DialogTitle>Edit profile</DialogTitle>
<DialogDescription>
Make changes to your profile here. Click save when you&apos;re
done.
</DialogDescription>
</DialogHeader>
<div className="grid gap-4">
<div className="grid gap-3">
<Label htmlFor="name-1">Name</Label>
<Input id="name-1" name="name" defaultValue="Pedro Duarte" />
</div>
<div className="grid gap-3">
<Label htmlFor="username-1">Username</Label>
<Input id="username-1" name="username" defaultValue="@peduarte" />
</div>
</div>
<DialogFooter>
<DialogClose asChild>
<Button variant="outline">Cancel</Button>
</DialogClose>
<Button type="submit">Save changes</Button>
</DialogFooter>
</DialogContent>
</form>
</Dialog>
)
}

## Installation

```bash
npx shadcn@latest add dialog
```

Install the following dependencies:

```bash
npm install @radix-ui/react-dialog
```

## Usage

```tsx showLineNumbers
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
```

```tsx showLineNumbers
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

## Examples

### Custom close button

<ComponentPreview name="dialog-close-button" />

## Notes

To use the `Dialog` component from within a `Context Menu` or `Dropdown Menu`, you must encase the `Context Menu` or
`Dropdown Menu` component in the `Dialog` component.

```tsx showLineNumbers title="components/example-dialog-context-menu.tsx" {1, 26}
<Dialog>
  <ContextMenu>
    <ContextMenuTrigger>Right click</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Open</ContextMenuItem>
      <ContextMenuItem>Download</ContextMenuItem>
      <DialogTrigger asChild>
        <ContextMenuItem>
          <span>Delete</span>
        </ContextMenuItem>
      </DialogTrigger>
    </ContextMenuContent>
  </ContextMenu>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. Are you sure you want to permanently
        delete this file from our servers?
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button type="submit">Confirm</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```
