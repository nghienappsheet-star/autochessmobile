import { test, expect } from "@playwright/test"

test.describe("SSR meta tags", () => {
  test("hero detail includes canonical and og:title", async ({ request }) => {
    const res = await request.get("/tuong/hawk")
    expect(res.ok()).toBeTruthy()
    const html = await res.text()
    expect(html).toContain('rel="canonical"')
    expect(html).toContain('property="og:title"')
  })

  test("home page includes title and meta description", async ({ request }) => {
    const res = await request.get("/")
    expect(res.ok()).toBeTruthy()
    const html = await res.text()
    expect(html).toMatch(/<title>[^<]+<\/title>/)
    expect(html).toContain('name="description"')
  })

  test("robots.txt disallows admin and lists sitemap", async ({ request }) => {
    const res = await request.get("/robots.txt")
    expect(res.ok()).toBeTruthy()
    const text = await res.text()
    expect(text).toContain("Disallow: /admin")
    expect(text).toMatch(/Sitemap:/i)
  })

  test("sitemap.xml returns XML with URLs", async ({ request }) => {
    const res = await request.get("/sitemap.xml")
    expect(res.ok()).toBeTruthy()
    const text = await res.text()
    expect(text).toContain("<urlset")
    expect(text).toContain("<loc>")
  })

  test("community detail includes og:title", async ({ request }) => {
    const res = await request.get("/thao-luan/1")
    expect(res.ok()).toBeTruthy()
    const html = await res.text()
    expect(html).toContain('property="og:title"')
    expect(html).toContain('rel="canonical"')
  })
})
