import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://react.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/React/);
});

test("Learn react", async ({ page }) => {
  await page.goto("https://react.dev/");

  // Click the get started link.
  await page.locator("a.bg-link >> text=Learn React").click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Quick Start" }),
  ).toBeVisible();
});
