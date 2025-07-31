import { nestJsConfig } from "./packages/eslint-config/nest.js";
import { nextJsConfig } from "./packages/eslint-config/next.js";

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: [
      // Ignore all files in apps, will be picked up by the app-specific configs
      "apps/*",
    ],
  },
  // Apply the NestJS config to the server app
  {
    files: ["apps/server/**/*.ts"],
    ...nestJsConfig,
  },
  // Apply the Next.js config to the web app
  {
    files: ["apps/web/**/*.{ts,tsx}"],
    ...nextJsConfig,
  },
];
