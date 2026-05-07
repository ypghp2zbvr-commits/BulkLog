import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    // baseURLを設定することで、テスト内の page.goto('/') が機能します
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* ここが重要：CI環境で自動的にアプリを立ち上げる設定 */
  webServer: {
    command: 'npm run build && npm run start', // ビルドは込みで実行する
    url: 'http://127.0.0.1:3000', // localhostではなくIPで指定
    reuseExistingServer: !process.env.CI,

    timeout: 180 * 1000, // ビルド含めて3分待つ
  },
});