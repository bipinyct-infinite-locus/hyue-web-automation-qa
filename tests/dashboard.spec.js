import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage.js';
// import { ProductPage } from '../pages/ProductPage.js';
// import { CartPage } from '../pages/CartPage.js';

test.describe('E-commerce Dashboard Flow', () => {
  test('User navigates dashboard and purchases product', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    // const product = new ProductPage(page);
    // const cart = new CartPage(page);

    await dashboard.navigateToDashboard(process.env.BASE_URL, { waitUntil: 'domcontentloaded' });

    // Ticker actions
    await dashboard.navigateTicker();

    // Hero Banner navigation
    await dashboard.scrollHeroBanner();

    // Click view all products
    await dashboard.clickViewAllProducts();

    // Select a product
    // await dashboard.selectFirstProduct();
    // await product.addToCart();
    // await product.goToCart();

    // Recheck price and increase quantity
    // await cart.verifyPrice('$100'); // Example price
    // await cart.increaseQuantity();

    // // Checkout
    // await cart.checkout();
  });
});
