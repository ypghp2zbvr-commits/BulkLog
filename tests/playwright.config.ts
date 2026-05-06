import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    webServer: {
        command: 'npm run dev' , //テスト用の環境を呼び出す起動コマンド
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        stdout: 'ignore',
        stderr: "pipe",
    },
    use: {
        // 環境変数があればそれを使う、なければローカルを使う
        baseURL: process.env.BASE_URL || 'http://localhost:3000',
        trace: 'on-first-retry'
    },
});