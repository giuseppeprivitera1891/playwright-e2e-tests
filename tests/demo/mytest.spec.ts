import {test, expect} from '@playwright/test';

test('Should load homepage with correct title', async ({page}) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/');
    await expect(page).toHaveTitle('CURA Healthcare Service');
    await expect(page.locator('//h1')).toHaveText('CURA Healthcare Service');
});

test('Should do something', {tag: '@smoke'}, async ({page}) => {
    await page.locator("//h1").click();
});

// only method exectutes the test and ignores the rest of the tests in the file
test.only('Should demo locators', async ({page}) => {
    await page.goto('https://katalon-demo-cura.herokuapp.com/');

    let makeAppmtBtn = page.getByRole("link", {name: "Make Appointment"});
    await makeAppmtBtn.click(); 
    await expect(page.getByText("Please login to make")).toBeVisible();
});