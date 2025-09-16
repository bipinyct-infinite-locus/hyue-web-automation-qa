import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('Milestone Cart', () => {
  let searchPage, productPage, cartPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    await searchPage.navigate('/');
  });

  test('TC_001 - Broken mirror icon & empty cart message', async () => {
    await cartPage.openCart();
    await expect(cartPage.emptyCartMsg).toContainText('You have no items in the cart');
  });

  test('TC_002 - Start Shopping button redirects to PLP', async () => {
    await cartPage.openCart();
    await expect(cartPage.startShoppingBtn).toBeVisible();
    await cartPage.startShoppingBtn.click();
    await expect(searchPage.searchInput).toBeVisible();
  });


  test('TC_003 - Verify product details in cart', async () => {
  await searchPage.searchForProduct('Gel FX Nail Paint');
  await productPage.addProductByName('Gel FX Nail Paint');
  await productPage.goToCart();  
  await expect(cartPage.cartItems.first()).toContainText('Gel FX Nail Paint');
});


  // test('TC_005 - Verify quantity update', async () => {
  //   await searchPage.searchForProduct('Lipstick');
  //   await productPage.addProductToCart(0);
  //   await cartPage.openCart();

  //   await cartPage.qtyPlus.click();
  //   await expect(cartPage.cartItems.first()).toContainText('2');

  //   await cartPage.qtyMinus.click();
  //   await expect(cartPage.cartItems.first()).toContainText('1');
  // });

  // test('TC_011 - Verify total price calculation', async () => {
  //   await searchPage.searchForProduct('Lipstick');
  //   await productPage.addProductToCart(0);
  //   await cartPage.openCart();
  //   const price = await cartPage.getTotalPrice();
  //   expect(price).toBe('₹299');
  // });

  // test('TC_015 - Verify ₹100 discount on 2 products', async () => {
  //   await searchPage.searchForProduct('Lipstick');
  //   await productPage.addProductToCart(0);
  //   await productPage.addProductToCart(1);
  //   await cartPage.openCart();

  //   await expect(cartPage.milestoneMsg).toContainText('₹100 OFF');
  //   const total = await cartPage.getTotalPrice();
  //   expect(total).toContain('662'); // 299+463-100
  // });

  // test('TC_021 - Verify ₹200 OFF on 3 products', async () => {
  //   await searchPage.searchForProduct('Lipstick');
  //   await productPage.addProductToCart(0);
  //   await productPage.addProductToCart(1);
  //   await productPage.addProductToCart(2);
  //   await cartPage.openCart();

  //   await expect(cartPage.discountPopup).toContainText("HURRAY! You've got ₹200 OFF");
  // });
});
