import { test, expect } from '@playwright/test';

test.describe("Checkout functionality", () => {
    test.beforeEach(async ({ page }) => {
        // Naviga alla pagina di login e verifica il titolo
        await page.goto("https://www.saucedemo.com/");
        await expect(page).toHaveTitle('Swag Labs');
    });

    test("Access with correct credentials", async ({ page }) => {
        // Effettua il login con le credenziali corrette
        await page.fill("#user-name", "standard_user");
        await page.fill("#password", "secret_sauce");
        await page.click("#login-button");

        // Assicurati che siamo sulla pagina dell'inventario
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    });

    test("Pick up the first item and go to checkout", async ({ page }) => {
        // Effettua il login (se non è già stato fatto nel test precedente)
        // Nota: In un contesto reale, dovresti usare test.beforeEach per il login
        await page.fill("#user-name", "standard_user");
        await page.fill("#password", "secret_sauce");
        await page.click("#login-button");
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

        // Aggiungi il primo elemento al carrello
        await page.waitForSelector(".inventory_item:first-child .btn_inventory", { state: "visible" });
        await page.click(".inventory_item:first-child .btn_inventory");

        // Vai al carrello e verifica che l'elemento sia stato aggiunto
        await page.click(".shopping_cart_link");
        await expect(page.locator(".cart_item")).toHaveCount(1);

        // Prosegui con il checkout
        await page.click("#checkout");

        // Verifica che siamo sulla pagina del checkout
        await expect(page).toHaveURL("https://www.saucedemo.com/checkout-step-one.html");
    });
});
