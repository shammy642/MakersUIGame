const { expect } = require("@playwright/test");

class Utils {
  async newPlayerJoinGame(page, newPage, name) {
    // host shares link
    const gameLink = await page.getByTestId("game-link").textContent();
    // player goes to host's link
    await newPage.goto(gameLink);
    await expect(newPage).toHaveURL(gameLink);
    // player enters name and clicks join room
    await newPage.getByPlaceholder("Username").fill(name);
    await newPage.locator("button").click();
  }

  async hostStartsGame(page) {
    await page.getByRole("button", { name: "Start Game" }).click();
  }
}

module.exports = Utils;
