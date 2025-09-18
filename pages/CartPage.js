// pages/CartPage.js
import { expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;

    // Empty cart message text
    this.emptyCartMsg = page.locator("text=You have no items in the cart");

    // "Start Shopping" button (can be <a> or <button>)
    this.startShoppingBtn = page.locator("text=/Start Shopping/i");

    // Home button (if needed)
    this.homeBtn = page.locator('button:has-text("Home")');

    // Cart modal (appears after Add to Cart, disappears after few sec)
    this.cartModalViewCart = page.locator(
      "body > sht-cart-noti div:nth-child(3) > a:nth-child(1)"
    );

    // Main cart items (once you’re inside cart drawer/page)
    this.cartItems = page.locator(".cart-item");

    // Checkout button inside cart
    this.checkoutBtn = page.locator('button:has-text("Checkout")');
    // this.cartItems = page.locator('.cart-item');
    // this.cartCount = page.locator('.cart-count');
    // this.qtyPlus = page.locator("button[name='plus'] svg");
    // this.qtyMinus = page.locator("button[name='minus']");
    // this.deleteBtn = page.locator('svg[viewBox="0 0 12 14"]');
    // this.deliveryCharge = page.locator('.delivery-charge');
    // this.freeDeliveryMsg = page.locator('.free-delivery-msg');
    // this.milestoneBar = page.locator('.milestone-progress-bar');
    // this.milestoneMsg = page.locator('.milestone-msg');
    // this.totalPrice = page.locator('.cart-total');
    // this.checkoutBtn = page.locator('button:has-text("Checkout")');
    this.discountPopup = page.locator(".achievement-modal-content");
    this.popupClose = this.discountPopup.locator(
      "button[class='achievement-modal-close'] svg"
    );
    // this.cartHeader = page.locator('.cart-header');
  }

  // ✅ Opens the cart drawer from header
  async openCart() {
    const cartBtn = this.page.locator("#headerCartStatus");
    await cartBtn.scrollIntoViewIfNeeded();
    await cartBtn.click();
    await this.page.locator("#shtCartDrawer").waitFor({
      state: "visible",
      timeout: 10000,
    });
  }

  // ✅ Click "View Cart" inside the Add-to-Cart modal (before it closes)
  async clickViewCartFromModal() {
    if (await this.cartModalViewCart.isVisible()) {
      await this.cartModalViewCart.click();
      await this.page.waitForLoadState("domcontentloaded");
    }
  }

  // ✅ Wait for discount popup and verify text
  async verifyDiscountPopup(expectedText) {
    await expect(this.discountPopup).toContainText(expectedText, {
      timeout: 10000,
    });
  }

  // ✅ Wait until discount popup is visible (no expect here)
  // async waitForDiscountPopup() {
  //   await this.discountPopup.waitFor({ state: "visible", timeout: 10000 });
  // }

  // ✅ Close popup
  async closeDiscountPopup() {
    if (await this.popupClose.isVisible()) {
      await this.popupClose.click();
      await this.discountPopup.waitFor({ state: "hidden", timeout: 5000 });
    }
  }
}
