const { test, expect, chromium } = require("@playwright/test");
const Utils = require("./utils");

const utils = new Utils();

test.describe("Player Lobby Page", () => {
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

  test("player should be redirected to lobby page", async ({ page }) => {
    await utils.newPlayerJoinGame(page, playerPage, "Simon");
    await expect(playerPage).toHaveURL("/lobby");
  });
  test("inputed name is visible in lobby along with the host", async ({page}) => {
    await utils.newPlayerJoinGame(page, playerPage, "Simon");
    await expect(page.getByText("Simon")).toBeVisible();
    await expect(page.getByText("Joe (Host)")).toBeVisible();
  });
  test("when a host starts a game, the player is directed to in-game", async ({page}) => {
    await utils.newPlayerJoinGame(page, playerPage, "Simon");
    await utils.hostStartsGame(page)
    await expect(playerPage).toHaveURL("/in-game");

  })
});
