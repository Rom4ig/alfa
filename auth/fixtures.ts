import {test as baseTest, request} from '@playwright/test';
import fs from 'fs';
import path from 'path';

export * from '@playwright/test';
export const test = baseTest.extend<{}, { workerStorageState: string }>({
    // Use the same storage state for all tests in this worker.
    storageState: ({workerStorageState}, use) => use(workerStorageState),

    // Authenticate once per worker with a worker-scoped fixture.
    workerStorageState: [async ({}, use) => {
        // Use parallelIndex as a unique identifier for each worker.
        const fileName = path.resolve(test.info().project.outputDir, `.auth/user.json`);

        if (fs.existsSync(fileName)) {
            // Reuse existing authentication state if any.
            await use(fileName);
            return;
        }

        // Important: make sure we authenticate in a clean environment by unsetting storage state.
        const context = await request.newContext({storageState: undefined});

        // Acquire a unique account, for example create a new one.
        // Alternatively, you can have a list of precreated accounts for testing.
        // Make sure that accounts are unique, so that multiple team members
        // can run tests at the same time without interference.

        // Send authentication request. Replace with your own.
        await context.get('https://enotes.pointschool.ru/')
        await context.post('https://enotes.pointschool.ru/login', {
            form: {
                '_csrf': 'ktZyn2UyJFNa9OVPWIYg526P5_Mb_CpgflRNL47y9xf84jDuCkJGOwmjgD4f5FbWCv6Cp12RWFcRAjxVwJOQfg==',
                'LoginForm[username]': 'test',
                'LoginForm[password]': 'test',
                'LoginForm[rememberMe]': '0',
                'login-button': ''
            }
        });

        await context.storageState({path: fileName});
        await context.dispose();
        await use(fileName);
    }, {scope: 'worker'}],
});