---
title: Accordion
description: A vertically stacked set of interactive headings that each reveal a section of content.
---

# Accordion

A vertically stacked set of interactive headings that each reveal a section of content.

## Installation

```bash
npx shadcn@latest add accordion
```

## Usage

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
```

```tsx
<Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```
