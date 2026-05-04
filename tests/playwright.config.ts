import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    use: {
        // 環境変数があればそれを使う、なければローカルを使う
        baseURL: process.env.BASE_URL || 'http://localhost:3000',
        trace: 'on-first-retry'
    },
});