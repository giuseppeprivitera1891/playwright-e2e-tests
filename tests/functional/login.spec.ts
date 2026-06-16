import {test, expect} from '@playwright/test';

    test.describe("Login functionality", () => {

        test.beforeEach("Go to login page", async ({page}) => {
            // launch URL and assert title and header
            await page.goto("https://katalon-demo-cura.herokuapp.com/");
            await expect(page).toHaveTitle('CURA Healthcare Service');
            await expect(page.locator('//h1')).toHaveText('CURA Healthcare Service');

            // click on the Make Appointment
            await page.getByRole("link", {name: "Make Appointment"}).click();
            await expect(page.getByText("Please login to make")).toBeVisible();
        });

        test("Should login successfully", async ({page}) => {
            // successful login
            await page.getByLabel("Username").fill("John Doe");
            await page.getByLabel("Password").fill("ThisIsNotAPassword");
            await page.getByRole("button", {name: "Login"}).click();

            // assert a text
            await expect(page.locator("h2")).toHaveText("Make Appointment");
        
        });   

        test("Should prevent login with incorrect credentials", async ({page}) => {
            // unsuccessful login
            await page.getByLabel("Username").fill("John Smith");
            await page.getByLabel("Password").fill("ThisIsNotAPassword");
            await page.getByRole("button", {name: "Login"}).click();

            // assert an error message
            await expect(page.locator('#login')).toContainText('Login failed! Please ensure the username and password are valid.');
        });     
});

