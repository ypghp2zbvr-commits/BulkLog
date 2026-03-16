import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/')
  await page.evaluate(() => {
    localStorage.clear()
  })
})

test('体重を入力して履歴に表示される', async ({ page }) => {
  await page.goto('http://localhost:3000/')

  await page.getByRole('link', { name: '体重を記録' }).click()

  await page.locator('input[type="number"]').fill('64.2')

  page.once('dialog', async (dialog) => {
    await dialog.accept()
  })

  await page.getByRole('button', { name: '保存' }).click()

  await expect(page).toHaveURL(/\/$/)

  await page.getByRole('link', { name: '履歴を見る' }).click()

  await expect(page.getByTestId('history-list')).toContainText('64.2 kg')
})