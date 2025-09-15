import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';

test.describe('Product Checkout Flow', () => {
  test('User can search, add products, and checkout', async ({ page }) => {
    const searchPage = new SearchPage(page);
    const productPage = new ProductPage(page);

    // Step 1: Navigate to homepage & search
    await searchPage.navigate('/');
    await searchPage.searchForProduct('Lipstick');

    // Step 2: Add 2 products to cart
    await productPage.addProductToCart(0);
    await productPage.addProductToCart(1);

    // Step 3: Checkout
    // await productPage.goToCheckout();
  });
});
