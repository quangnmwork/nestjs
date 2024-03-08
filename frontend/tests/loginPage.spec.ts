import { test, expect } from '../playwright/fixture';

test('E2E', async ({ page }) => {
  await page.goto('/auth/login');

  await page.getByLabel('Email').fill('q@gmail.com');
  await page.getByLabel('Password').fill('123456');

  await page.getByText('Submit').click();

  page.on('console', () => {
    console.log(page.getByText(/Login success/));
  });

  expect(page.getByText(/Login success/)).toBeVisible();

  const accessToken = await page.evaluate(() =>
    localStorage.getItem('accessToken'),
  );
  const refreshToken = await page.evaluate(() =>
    localStorage.getItem('accessToken'),
  );

  expect(accessToken).not.toBeNull();
  expect(refreshToken).not.toBeNull();
});

test('Email and password should display error', async ({ page }) => {
  await page.goto('http://localhost:3000/auth/login');

  await page.getByLabel('Email').fill('qcom');
  await page.getByText('Submit').click();

  expect(page.getByText('Email is invalid')).toBeDefined();
  expect(page.getByText('Password is invalid')).toBeDefined();
});
