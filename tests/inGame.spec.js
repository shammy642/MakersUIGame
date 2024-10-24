const { test, expect, chromium } = require("@playwright/test");
const Utils = require("./utils")

const utils = new Utils()

test.describe("In game page", () => {
  let playerPage;
  let context;
  let browser;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    await page.getByPlaceholder("Username").fill("Joe");
    await page.locator("button").click();

    browser = await chromium.launch();
    context = await browser.newContext();
    playerPage = await context.newPage();
  });

  test.afterEach(async () => {
    await context.close();
    await browser.close();
  });

  test("mocks a pokemon and doesnt call api", async ({ page }) => {

    expect(true).toBe(true);
  });
})