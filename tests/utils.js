const { expect} = require("@playwright/test");

class Utils {

  async newPlayerJoinGame(page, newPage, name) {
    const gameLink = await page.locator(".game-link").textContent();
    await newPage.goto(gameLink)
    await expect(newPage).toHaveURL(gameLink)

    await newPage.getByPlaceholder("Username").fill(name);
    await newPage.locator("button").click();
  }
}

module.exports = Utils