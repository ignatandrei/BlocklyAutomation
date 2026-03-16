// spec: specs/chuck-norris-test-plan.md
// seed: tests/seed.spec.ts
// In your test file
// Update the path below to the actual location of your config file
import { testConfig } from './configUrl';

import { test, expect } from '@playwright/test';


test.describe('API Tests', () => {
  testConfig.successUrls.forEach(({ name, url }) => {
    test(`${name} - Success Flow`, async ({ page }) => {
     test.setTimeout(60_000);
      // 1. Navigate to Chuck Norris API example and verify page loads successfully
    await page.goto(url);
    await expect(page.getByText('Visual API')).toBeVisible();

    // 2. Wait 10 seconds for data loading period to complete and verify all block definitions are properly initialized
    await new Promise(f => setTimeout(f, 10 * 1000));

    // Close the help tour dialog to access the interface
    await page.getByRole('button', { name: 'Close Tour' }).click();

    
    // 4. Click Execute button and verify successful API call with Chuck Norris joke output and no errors
    await page.getByRole('button', { name: 'Execute!' }).click();

        await new Promise(f => setTimeout(f, 25 * 1000));

    // Verify output contains expected debug messages and Chuck Norris joke
    await expect(page.getByText('debug mode:start running code !')).toBeVisible();
    await expect(page.getByText('finish running code!')).toBeVisible();
    
    });
  });
});

test.describe('Success Flow', () => {
  test('blockly Execution', async ({ page }) => {
    // 1. Navigate to Chuck Norris API example and verify page loads successfully
    await page.goto('http://localhost:3000/BlocklyAutomation/automation/loadexample/chuck_norris');
    await expect(page.getByText('Visual API')).toBeVisible();

    // 2. Wait 10 seconds for data loading period to complete and verify all block definitions are properly initialized
    await new Promise(f => setTimeout(f, 10 * 1000));

    // Close the help tour dialog to access the interface
    await page.getByRole('button', { name: 'Close Tour' }).click();

    
    // 4. Click Execute button and verify successful API call with Chuck Norris joke output and no errors
    await page.getByRole('button', { name: 'Execute!' }).click();

    // Verify output contains expected debug messages and Chuck Norris joke
    await expect(page.getByText('debug mode:start running code !')).toBeVisible();
    await expect(page.getByText('finish running code!')).toBeVisible();
    
  });
});