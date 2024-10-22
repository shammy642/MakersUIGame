const { test, expect } = require("@playwright/test");

test.describe("Host landing page", () => {
  test("has game title", async ({ page }) => {
    await page.goto("/");

    const gameName = page.locator('[data-testid="game-name"]');
    await expect(gameName).toHaveText("Guess the weight of the Pokémon!");
  });
  test("can enter username into field", async ({ page }) => {
    await page.goto("/");

    const inputEl = page.getByPlaceholder("Username");
    await inputEl.fill("Joe");

    expect(inputEl).toHaveValue("Joe");
  });

  test("Create game button to exist", async ({ page }) => {
    await page.goto("/");
    const buttonEl = page.getByRole("button");

    await expect(buttonEl).toHaveText("Create Game");
  });
  test("inputing a name and then going to the next page", async ({ page }) => {
    await page.goto("/");

    const inputEl = page.getByPlaceholder("Username");
    await inputEl.fill("Joe");

    const buttonEl = page.getByRole("button");
    await buttonEl.click();

    await expect(page).toHaveURL("/lobby/host");
  });
});
