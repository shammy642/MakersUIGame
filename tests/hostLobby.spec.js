const { test, expect, chromium } = require("@playwright/test");
const Utils = require("./utils")

const utils = new Utils()

test.describe("Host Lobby Tests", () => {
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

  test("host should be redirected to lobby page", async ({ page }) => {
    await expect(page).toHaveURL("/lobby");
  });

  test("host name should be visible in lobby", async ({ page }) => {
    await expect(page.getByText("Joe (Host)")).toBeVisible();
  });

  test("lobby should display shareable game link", async ({ page }) => {
    await expect(page.getByTestId("game-link")).toContainText("/join");
  });

  test("start game button is visible", async ({ page }) => {
    const buttonEl = page.getByRole("button", { name: "Start Game"});
    console.log(buttonEl)
    await expect(buttonEl).toHaveText("Start Game");
  });

  test("player should be able to access lobby via shared link", async ({page,}) => {
    await expect(page.getByText("Joe (Host)")).toBeVisible();

    const gameLinkString = await page.getByTestId("game-link").textContent();
    await playerPage.goto(gameLinkString);

    await expect(playerPage).toHaveURL(gameLinkString);
  });

  test("player's name should appear in host lobby after joining", async ({page}) => {
    await expect(page.getByText("Joe (Host)")).toBeVisible();

    await utils.newPlayerJoinGame(page, playerPage, "John")

    await expect(page.getByText("John")).toBeVisible();
  });
  test("given a host and a player the host clicks start game", async ({page}) => {
    await expect(page.getByText("Joe (Host)")).toBeVisible();

    await utils.newPlayerJoinGame(page, playerPage, "John")

    await expect(page.getByText("John")).toBeVisible();

    await page.getByRole("button", {name: "Start Game"}).click();

    await expect(page).toHaveURL("/in-game");
  })
});
