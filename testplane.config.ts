import path from 'path';
import type { WdioBrowser } from 'testplane';
import { setupBrowser } from '@testplane/testing-library';
import { getStoryFile } from '@testplane/storybook';

// Read more about configuring Testplane at https://testplane.io/docs/v8/config/main/
export default {
    gridUrl: 'local',
    baseUrl: 'http://localhost',
    pageLoadTimeout: 20000,
    httpTimeout: 20000,
    testTimeout: 90000,
    resetCursor: false,
    headless: true, // Essential for GitHub CI
    screenshotsDir: (test) => {
        const storyFilePath = getStoryFile(test);
        const storyFileName = path.basename(storyFilePath);

        return path.join(
            'testplane',
            `${storyFileName}-screens`,
            test.id,
            test.browserId,
        );
    },
    sets: {
        desktop: {
            files: ['testplane-tests/**/*.testplane.(t|j)s'],
            browsers: ['linux-chrome'],
        },
    },
    browsers: {
        'linux-chrome': {
            desiredCapabilities: {
                browserName: 'chrome',
                browserVersion: '135',
                'goog:chromeOptions': {
                    args: ['--no-sandbox'], // Essential for GitHub CI
                },
            },
        },
    },
    prepareBrowser: (browser: WdioBrowser) => {
        setupBrowser(browser);
    },
    plugins: {
        '@testplane/storybook': {
            storybookConfigDir: './config/storybook',
        },
        'html-reporter/testplane': {
            // https://github.com/gemini-testing/html-reporter
            enabled: true,
            path: 'testplane-report',
            defaultView: 'all',
        },
    },
} satisfies import('testplane').ConfigInput;
