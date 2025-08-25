import { test, expect } from "@playwright/test";

async function signupAndLogin(page: any) {
  const email = `dash+${Date.now()}@example.com`;
  const password = "password123";
  await page.goto("/signup");
  await page.fill('input[name="name"]', "Dash User");
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.fill('input[name="confirmPassword"]', password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("/dashboard", { timeout: 20000 });
}

test("dashboard shows stats and recent files", async ({ page }) => {
  await signupAndLogin(page);

  // Ensure stats API is called
  const statsPromise = page.waitForResponse(
    (resp) => resp.url().endsWith("/dashboard/stats") && resp.ok(),
  );

  await page.goto("/dashboard");

  const statsResp = await statsPromise;
  const statsJson = await statsResp.json();
  expect(statsJson).toMatchObject({
    totalFiles: expect.any(Number),
    totalFolders: expect.any(Number),
    storageUsed: expect.any(Number),
    storageLimit: expect.any(Number),
    recentFiles: expect.any(Array),
  });

  // UI assertions
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await expect(page.getByText(/^Total Files$/i)).toBeVisible();
  await expect(page.getByText(/^Total Folders$/i)).toBeVisible();
  await expect(page.getByText("Storage Used")).toBeVisible();
});
