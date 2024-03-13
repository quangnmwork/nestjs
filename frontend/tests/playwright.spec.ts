/**
 * This file test feature of playwright
 */

import test, { expect } from '@playwright/test';

test('404 page render correctly', async ({ page }) => {
  await page.goto('https://dynamic-page-eight.vercel.app/');

  expect(
    await page.screenshot({
      path: 'screenshot/random-number.png',
      mask: [page.getByRole('button')],
    }),
  ).toMatchSnapshot('screenshot/random-number.png');

  await expect(page).toHaveScreenshot('screenshot/random-number.png', {
    mask: [page.getByRole('button')],
  });
});
