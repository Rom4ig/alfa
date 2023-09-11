import { test as baseTest, request } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { loginFullUrl } from '../constants/routes';
import userData from './user.json';

export * from '@playwright/test';
// eslint-disable-next-line
export const test = baseTest.extend<{}, { workerStorageState: string }>({
  // Use the same storage state for all tests in this worker.
  storageState: async ({ workerStorageState }, use) => {
    await use(workerStorageState);
  },

  workerStorageState: [
    async ({}, use) => {
      const fileName = path.resolve(test.info().project.outputDir, '.auth/user.json');
      if (fs.existsSync(fileName)) {
        await use(fileName);
        return;
      }

      const context = await request.newContext({ storageState: undefined });

      const responseGet = await context.get(loginFullUrl);
      await context.storageState();

      const responseBody = (await responseGet.body()).toString();
      const regex = /csrf-token" content="([^"]+)"/;
      const csrf = responseBody.match(regex);
      await context.post(loginFullUrl, {
        form: {
          _csrf: csrf[1],
          'LoginForm[username]': userData.login,
          'LoginForm[password]': userData.password
        }
      });
      await context.storageState({ path: fileName });

      await context.dispose();
      await use(fileName);
    },
    { scope: 'worker' }
  ]
});
