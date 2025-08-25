# Page snapshot

```yaml
- button "Open Next.js Dev Tools":
    - img
- button "Open issues overlay": 1 Issue
- navigation:
    - button "previous" [disabled]:
        - img "previous"
    - text: 1/1
    - button "next" [disabled]:
        - img "next"
- img
- link "Next.js 15.4.4 (stale) Turbopack":
    - /url: https://nextjs.org/docs/messages/version-staleness
    - img
    - text: Next.js 15.4.4 (stale) Turbopack
- img
- dialog "Build Error":
    - text: Build Error
    - button "Copy Stack Trace":
        - img
    - button "No related documentation found" [disabled]:
        - img
    - link "Learn more about enabling Node.js inspector for server code with Chrome DevTools":
        - /url: https://nextjs.org/docs/app/building-your-application/configuring/debugging#server-side-code
        - img
    - paragraph: Parsing ecmascript source code failed
    - img
    - text: ./apps/web/src/app/(main)/drive/page.tsx (594:3)
    - button "Open in editor":
        - img
    - text: "Parsing ecmascript source code failed 592 | <NewFolderModal /> 593 | <UploadModal /> > 594 | ); | ^ 595 | } 596 | Expression expected"
- alert
```
