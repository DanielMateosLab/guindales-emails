import puppeteer, { Browser, Page } from "puppeteer"

describe("index", () => {
  let browser: Browser
  let page: Page

  beforeAll(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
  })

  beforeEach(async () => {
    await page.goto("http://localhost:3000")
  })

  afterAll(async () => {
    await browser.close()
  })

  it("should show the home-title", async () => {
    await page.waitForSelector(".home-title")

    const homeTitleText = await page.$eval(".home-title", (e) => e.textContent)
    expect(homeTitleText).toContain(
      "Gestiona fácilmente todas tus listas de correo"
    )
  })
})
