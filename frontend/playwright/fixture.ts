// import fs from 'fs';
// import path from 'path';

import { test as baseTest, expect } from '@playwright/test';
import { http } from 'msw';
import { createWorkerFixture, MockServiceWorker } from 'playwright-msw';

import { handlers } from '@/mocks/handlers';

const test = baseTest.extend<{
  // workerStorageState: [];
  worker: MockServiceWorker;
  http: typeof http;
}>({
  // storageState: ({ workerStorageState }, use) => use(workerStorageState),
  worker: createWorkerFixture(handlers),
  http,
  // workerStorageState: [
  //   async ({ browser }, use): Promise<void> => {
  //     const id = test.info().parallelIndex;

  //     const fileName = path.resolve(
  //       test.info().project.outputDir,
  //       `.auth/${id}.json`,
  //     );

  //     if (fs.existsSync(fileName)) {
  //       await use(fileName);
  //       return;
  //     }

  //     const page = await browser.newPage({ storageState: undefined });

  //     await page.goto('http://localhost:3000/auth/login');
  //     await page.getByLabel('Email').fill('q@gmail.com');
  //     await page.getByLabel('Password').fill('1');
  //     await page.getByText('Submit').click();

  //     // End of authentication steps
  //     await page.context().storageState({ path: fileName });
  //     await page.close();
  //     await use(fileName);
  //   },
  //   { scope: 'worker' },
  // ],
});

export { expect, test };
