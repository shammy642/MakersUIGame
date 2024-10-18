
const { test, expect } = require('@playwright/test');

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  const gameName = page.locator('h1[data-testid="game-name"]');
  await expect(gameName).toHaveText('Guess the number!');
});
