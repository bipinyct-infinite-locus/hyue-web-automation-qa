import { test, expect } from "@playwright/test";
import { SearchPage } from "../pages/SearchPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";

test.describe("Milestone Cart", () => {
  let searchPage, productPage, cartPage;

  test.beforeEach(async ({ page }) => {
    searchPage = new SearchPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    await searchPage.navigate("/");
  });

  test("TC_001 - Broken mirror icon & empty cart message", async () => {
    await cartPage.openCart();
    await expect(cartPage.emptyCartMsg).toContainText(
      "You have no items in the cart"
    );
  });

  test("TC_002 - Start Shopping button redirects to PLP", async () => {
    await cartPage.openCart();
    await expect(cartPage.startShoppingBtn).toBeVisible();
    await cartPage.startShoppingBtn.click();
    await expect(searchPage.searchInput).toBeVisible();
  });

  //   test('TC_003 - Verify product details in cart', async () => {
  //   await searchPage.searchForProduct('Gel FX Nail Paint');
  //   await productPage.addProductByName('Gel FX Nail Paint');
  //   await productPage.goToCart();
  //   await expect(cartPage.cartItems.first()).toContainText('Gel FX Nail Paint');
  // });

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

  test("TC_030 - Verify milestone discount popups (100 & 200 OFF)", async () => {
    // Add 1st product
    await searchPage.searchForProduct("Lipstick");
    await productPage.addProductToCart(0);
    // await cartPage.openCart();
    // await expect(cartPage.discountPopup).toBeHidden(); // no popup after first product
    // await cartPage.closeCart?.(); // optional if drawer needs closing before next add

    // Add 2nd product
    await productPage.addProductToCart(1);
    await cartPage.verifyDiscountPopup("₹100 OFF");
    await cartPage.closeDiscountPopup();

    // Add 3rd product
    await productPage.addProductToCart(2);
    await cartPage.verifyDiscountPopup("₹200 OFF");
    await cartPage.closeDiscountPopup();
  });
});
