import { test, expect } from '@playwright/test'
import { execPath } from 'process'

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:3000')
  await page.evaluate(() => {
    localStorage.clear()
  })
})

test('体重を入力して履歴に表示される', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000')

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


  test('空データを登録できないことを確認する', async ({ page }) => {
    // 1. home画面へ遷移する
    await page.goto('http://127.0.0.1:3000');

    // 2.体重記録ボタンを押下する
    // 3. [体重記録]画面へ遷移する（ボタン押下で自動遷移）
    await page.getByRole('link', { name: '体重を記録' }).click();

    // 4. 日付を選択する
    // 一旦スキップ

    // 5. 体重入力欄をnullにする
    await page.locator('input[type="number"]').fill('');

    // 6. 保存ボタンを押下する & 7. エラーが表示される
    page.once('dialog',async (dialog) => {
      // 期待値備考：「体重を入力してください」のエラーが表示される
        expect(dialog.message()).toBe('体重を入力してください');
        await dialog.accept();
    });

    await page.getByRole('button', { name: '保存' }).click();

    // 追加の期待値　保存されていない（画面が切り替わらないこと）
    await expect(page).toHaveURL(/\/weight/);

  });


    test('最小値0.1kgの登録テスト', async ({ page }) => {
    // home画面へ遷移する
    await page.goto('http://127.0.0.1:3000');

    // 体重記録ボタンを押下する
    // [体重記録]画面へ遷移する（ボタン押下で自動遷移）
    await page.getByRole('link' , { name: '体重を記録'}).click();

    // 体重入力欄に"0.1"を入力する
    await page.locator('input[type="number"]').fill('0.1');

    // アラートを表示させる
    page.once('dialog',async(dialog) => {
      // アラート（ポップアップ）を表示して閉じるボタンを押下する
      await dialog.accept();
    });

    // 保存ボタンを押下する
    await page.getByRole('button',{ name: "保存"}).click();

      // 履歴ページへ遷移する
    await page.goto('//history');

      // 履歴ページ に遷移できたことを確認する（URLを見て確認してる）
    await expect(page).toHaveURL(/.*history$/);

      // 履歴に0.1kgが登録されていることを確認する
    await expect(page.getByTestId('history-list')).toContainText('0.1 kg');

  })


  test('体重登録した同日に再度体重登録を行い、結果が上書きされることを確認する', async({ page }) => {
    // 1. 1回目の体重登録  
    await page.goto('http://127.0.0.1:3000');

    // 2. 体重を記録ボタンを押下する
    await page.getByRole('link' , { name: '体重を記録' }).click();

    // 3. 体重を60にする
    await page.locator('input[type="number"]').fill('60');

    // 4. 保存ボタン押下、確認ダイアログを閉じるボタン押下
    page .once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await page.getByRole('button',{ name : "保存" }).click();

    // 5. home画面で60 kg と表示されていること
    await expect(page.getByText('60 kg', { exact: true })).toBeVisible();

    // 2回目の登録準備
    // 6. 再度、体重を記録ボタンを押下する
    await page.getByRole('link',{ name : '体重を記録' }).click();

    // 7.  /weightに移動したことをURLで確認する
    await expect(page).toHaveURL(/.*weight$/);

    // 2回目の体重記録続き
    // 8. 体重記録を65kgで登録する
    await page.locator('input[type="number"]').fill('65');

    // 9. 保存ボタン押下
    page .once('dialog', async(dialog) => {
      await dialog.accept();
    });
    await page.getByRole('button', { name: "保存" }).click();

    // 10.ホーム画面で65kgに更新されていることを確認
    await expect(page.getByText('65 kg', { exact: true })).toBeVisible();
    
    // 11. 1回目の60kgが消えていることを確認
    await expect(page.getByText('60 kg',{ exact: true })).not.toBeVisible();

    // 12. 履歴ページに遷移する
    await page.getByRole('link', { name: "履歴を見る" }).click();

    // 13. リストの数が1件であることを確認する
    const historyItems = page.locator('[data-testid="history-list"] > div');
    await expect(historyItems).toHaveCount(1);

  });