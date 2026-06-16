import { test, expect } from "@playwright/test"

test.describe("Admin smoke", () => {
  test("items page loads and opens add dialog", async ({ page }) => {
    await page.goto("/admin/trang-bi")
    await expect(page.getByRole("heading", { name: /quản lý trang bị/i })).toBeVisible({
      timeout: 15_000,
    })

    await page.getByRole("button", { name: /thêm trang bị mới/i }).click()
    await expect(page.getByRole("dialog")).toBeVisible()
    await expect(page.getByText("Tên trang bị")).toBeVisible({ timeout: 10_000 })
  })

  test("items page creates a new item via dialog", async ({ page }) => {
    const itemName = `E2E Item ${Date.now()}`

    await page.goto("/admin/trang-bi")
    await expect(page.getByRole("heading", { name: /quản lý trang bị/i })).toBeVisible({
      timeout: 15_000,
    })

    await page.getByRole("button", { name: /thêm trang bị mới/i }).click()
    await expect(page.getByRole("dialog")).toBeVisible()
    await page.getByPlaceholder(/búa lôi đình/i).fill(itemName)
    await page.getByRole("button", { name: /lưu trang bị/i }).click()

    await expect(page.getByText(`Đã thêm trang bị "${itemName}".`)).toBeVisible({
      timeout: 10_000,
    })
    await expect(page.getByRole("dialog")).not.toBeVisible()
    await expect(page.getByText(itemName)).toBeVisible()
  })

  test("users page loads admin shell", async ({ page }) => {
    await page.goto("/admin/nguoi-dung")
    await expect(page.getByRole("heading", { name: /quản lý người dùng/i })).toBeVisible({
      timeout: 15_000,
    })
    await expect(page.getByPlaceholder(/tìm kiếm theo tên hoặc email/i)).toBeVisible()
  })

  test("public login syncs user to admin list", async ({ page }) => {
    const email = `e2e-${Date.now()}@example.com`

    await page.addInitScript(() => {
      localStorage.setItem("autochessmobile-locale", "vi")
      localStorage.removeItem("auto_chess_user")
    })

    await page.goto("/")
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible({ timeout: 15_000 })

    await page.getByRole("banner").getByRole("button", { name: /^đăng nhập$/i }).click()
    await expect(page.getByRole("heading", { name: /đăng nhập vào tài khoản/i })).toBeVisible()
    await page.getByPlaceholder("name@example.com").fill(email)
    await page.getByPlaceholder("••••••••").fill("test-password")
    await page.locator("form").getByRole("button", { name: /^đăng nhập$/i }).click()

    await page.goto("/admin/nguoi-dung")
    await expect(page.getByRole("heading", { name: /quản lý người dùng/i })).toBeVisible({
      timeout: 15_000,
    })
    await expect(page.getByText(email)).toBeVisible({ timeout: 10_000 })
  })

  test("public home loads without admin chrome", async ({ page }) => {
    await page.goto("/")
    await expect(page.locator("body")).toBeVisible()
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible({ timeout: 15_000 })
  })
})
