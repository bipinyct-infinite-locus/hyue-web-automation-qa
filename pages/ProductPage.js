// pages/ProductPage.js
export class ProductPage {
  constructor(page) {
    this.page = page;
    this.productCards = page.locator('.product-card');
    this.cartIcon = page.locator("a#headerCartStatus");
    this.checkoutBtn = page.locator('button:has-text("Checkout")'); // adjust selector
  }

  // Add product to cart by index (0-based)
  async addProductToCart(index) {
    const product = this.productCards.nth(index);
    const addToCartBtn = product.locator('button:has-text("Add to cart")');

    // Scroll into view and wait for visibility
    await addToCartBtn.scrollIntoViewIfNeeded();
    await addToCartBtn.waitFor({ state: 'visible' });

    await addToCartBtn.click();
  }


// New method for checkout flow
  // async goToCheckout() {
  //   // Scroll up to bring cart into view
  //   await this.cartIcon.scrollIntoViewIfNeeded();
  //   await this.cartIcon.waitFor({ state: 'visible' });

  //   // Click cart icon
  //   await this.cartIcon.click();
  //   await this.page.waitForLoadState('domcontentloaded');

  //   // Proceed to checkout
  //   await this.checkoutBtn.waitFor({ state: 'visible' });
  //   await this.checkoutBtn.click();

  //   // Verify navigation
  //   await this.page.waitForURL(/checkout/);
  // }
}
