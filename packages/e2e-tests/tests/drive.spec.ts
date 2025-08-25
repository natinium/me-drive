import { test, expect } from "@playwright/test";

test.describe.configure({ mode: "serial" });

async function signupAndLogin(page: any) {
  const email = `e2e+${Date.now()}@example.com`;
  const password = "password123";
  await page.goto("/signup");
  await page.fill('input[name="name"]', "E2E User");
  await page.fill('input[name="email"]', email);
  await page.fill('input[name="password"]', password);
  await page.fill('input[name="confirmPassword"]', password);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL("/dashboard", { timeout: 20000 });
  return { email, password };
}

test.describe("Drive actions", () => {
  test("create folder via modal and see it in My Drive", async ({ page }) => {
    await signupAndLogin(page);

    await page.goto("/drive");

    // Open actions menu
    await page.click('button:has-text("New")');
    await page.click("text=New Folder");

    // Modal should appear
    await expect(page.getByRole("dialog")).toBeVisible();
    const folderName = `E2E Folder ${Date.now()}`;
    await page.fill("input#folder-name", folderName);
    await page.click('button:has-text("Create Folder")');

    // Should close and refresh table with new folder
    await expect(page.getByRole("dialog")).toBeHidden({ timeout: 10000 });
    await expect(page.getByText(folderName)).toBeVisible({ timeout: 15000 });
  });

  test("upload file via modal and see it in My Drive", async ({
    page,
    context,
  }) => {
    await signupAndLogin(page);
    await page.goto("/drive");

    // Open actions menu
    const newBtn = page.getByRole("main").getByRole("button", { name: "New" });
    await expect(newBtn).toBeVisible();
    await newBtn.click();
    await page.getByRole("menuitem", { name: "Upload File" }).click();

    // Modal visible
    await expect(page.getByRole("dialog")).toBeVisible();

    // Click "Select Files" to trigger file chooser
    const [fileChooser] = await Promise.all([
      page.waitForEvent("filechooser"),
      page.click('button:has-text("Select Files")'),
    ]);

    // Provide a small file buffer
    await fileChooser.setFiles({
      name: "hello.txt",
      mimeType: "text/plain",
      buffer: Buffer.from("hello world"),
    });

    // After upload, modal should close
    await expect(page.getByRole("dialog")).toBeHidden({ timeout: 20000 });

    // Wait for the drive list to refresh (files GET)
    await page.waitForResponse(
      (res) => res.url().includes("/files") && res.request().method() === "GET",
      { timeout: 20000 },
    );

    // Then expect the file to appear in the table
    await expect(page.getByText("hello.txt")).toBeVisible({ timeout: 20000 });
  });
});
