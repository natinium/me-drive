# MeDrive UI Components

This document provides an overview of the UI components available in the MeDrive project, built with shadcn/ui and Tailwind CSS.

## General Principles

- **Styling**: All UI should be built using **Tailwind CSS**. Adhere to existing Tailwind conventions and utility classes.
- **Component Library**: Always prioritize using **shadcn/ui** components. These components are pre-styled with Tailwind and provide accessibility features.
- **Icons**: Use **Lucide React** icons exclusively.
- **Atomic Commits**: Ensure all UI-related commits are atomic and follow Conventional Commits (e.g., `feat(web-ui): Add new dashboard card`).

## Available Components

Here is a list of all documented components. Click on any component to view its detailed documentation, including installation and usage instructions.

- [Accordion](./accordion.md)
- [Alert](./alert.md)
- [Alert Dialog](./alert-dialog.md)
- [Avatar](./avatar.md)
- [Badge](./badge.md)
- [Breadcrumb](./breadcrumb.md)
- [Button](./button.md)
- [Card](./card.md)
- [Checkbox](./checkbox.md)
- [Collapsible](./collapsible.md)
- [Data Table](./data-table.md)
- [Dialog](./dialog.md)
- [Form](./form.md)
- [Input](./input.md)
- [Navigation Menu](./navigation-menu.md)
- [Pagination](./pagination.md)
- [Progress](./progress.md)
- [Radio Group](./radio-group.md)
- [Select](./select.md)
- [Separator](./separator.md)
- [Sidebar](./sidebar.md)
- [Skeleton](./skeleton.md)
- [Sonner](./sonner.md)
- [Switch](./switch.md)
- [Table](./table.md)
- [Tabs](./tabs.md)
- [Textarea](./textarea.md)
- [Toggle](./toggle.md)
- [Typography](./typography.md)

## Adding New Components

1.  **Check for Existing Components**: Before creating a new component, verify if a similar one already exists in shadcn/ui.
2.  **Use `shadcn@latest`**: To add a new shadcn/ui component, use the following command:
    ```bash
    npx shadcn@latest add [component-name]
    ```
3.  **Update Documentation**: After adding a new component, add a new file for it and link it in this `ui.md` file.

## Code Formatting and Linting

- **Prettier**: Ensure your code is formatted with Prettier before committing.
- **ESLint**: Run ESLint to catch any potential issues.

## Accessibility

- **Semantic HTML**: Use semantic HTML elements wherever possible.
- **ARIA Attributes**: Ensure all interactive components have the necessary ARIA attributes for accessibility.
