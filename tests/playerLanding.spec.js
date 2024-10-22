const { test, expect, chromium } = require("@playwright/test");
const Utils = require("./utils");

const utils = new Utils();

test.describe("Player Landing Page", () => {
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

  test("player should be able enter to their name", async ({ page }) => {
    const gameLink = await page.getByTestId("game-link").textContent();
    await playerPage.goto(gameLink)
    await expect(playerPage).toHaveURL(gameLink)

    const inputEl = playerPage.getByPlaceholder("Username");
    await inputEl.fill("Joe");

    expect(inputEl).toHaveValue("Joe");
  });
  test("join room button is visible to player", async ({ page }) => {
    const gameLink = await page.getByTestId("game-link").textContent();
    await playerPage.goto(gameLink)
    await expect(playerPage).toHaveURL(gameLink)

    const buttonEl = await playerPage.getByRole("button", { name: "Join Room"})

    await expect(buttonEl).toBeVisible()
  })
  test("player enters name and then can join game", async ({ page }) => {
    const gameLink = await page.getByTestId("game-link").textContent();
    await playerPage.goto(gameLink)
    await expect(playerPage).toHaveURL(gameLink)

    const inputEl = playerPage.getByPlaceholder("Username");
    await inputEl.fill("Joe");

    await playerPage.getByRole("button", { name: "Join Room"}).click()

    await expect(playerPage).toHaveURL('/lobby/player')
  })
});
