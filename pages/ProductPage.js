// pages/ProductPage.js
export class ProductPage {
  constructor(page) {
    this.page = page;
    this.productCards = page.locator('.product-card');
    this.cartIcon = page.locator("a#headerCartStatus");
    this.checkoutBtn = page.locator('button:has-text("Checkout")');
  }

  // ✅ Add product to cart by index (unchanged)
  async addProductToCart(index) {
    const product = this.productCards.nth(index);
    const addToCartBtn = product.locator('button:has-text("Add"), button:has-text("Add to cart")');
    await addToCartBtn.scrollIntoViewIfNeeded();
    await addToCartBtn.waitFor({ state: 'visible' });
    await addToCartBtn.click();
  }

  // ✅ Add product to cart by (partial) name
  async addProductByName(productName) {
    const maxScrolls = 20; // prevent infinite loop
    let product;

    for (let i = 0; i < maxScrolls; i++) {
      // Partial text match so prefix/suffix don’t break
      product = this.page.locator('.product-card', { hasText: productName });

      if (await product.count() > 0) {
        await product.first().scrollIntoViewIfNeeded();
        break;
      }

      // Scroll down for lazy-loaded products
      await this.page.evaluate(() => window.scrollBy(0, 400));
      await this.page.waitForTimeout(500);
    }

    if (!product || (await product.count()) === 0) {
      throw new Error(`Product "${productName}" not found after scrolling`);
    }

    // Flexible button locator (handles "Add", "Add to cart", "ADD TO CART")
    const addToCartBtn = product.locator(
      'button:has-text("Add"), button:has-text("Add to cart"), button:has-text("ADD TO CART")'
    );

    if ((await addToCartBtn.count()) === 0) {
      throw new Error(`Add to Cart button not found for "${productName}"`);
    }

    await addToCartBtn.first().scrollIntoViewIfNeeded();
    await addToCartBtn.first().waitFor({ state: 'visible' });
    await addToCartBtn.first().click();
  }
  
    async goToCart() {
    const viewCartBtn = this.page.locator('body > sht-cart-noti a:has-text("View Cart")');

    if (await viewCartBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await viewCartBtn.click();
    } else {
      await this.cartIcon.click();
    }
  }


}
