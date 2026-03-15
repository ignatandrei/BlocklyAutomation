import { test, expect } from '@playwright/test';

test.describe('Test group', () => {
  test('seed', async ({ page }) => {
    // generate code here.
    await page.goto('http://localhost:3000/BlocklyAutomation/');
  });
});
