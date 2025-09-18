// pages/CartPage.js
import { expect } from "@playwright/test";

export class CartPage {
  constructor(page) {
    this.page = page;

    // Empty cart message
    this.emptyCartMsg = page.locator("text=You have no items in the cart");

    this.startShoppingBtn = page.locator("text=/Start Shopping/i");
    this.homeBtn = page.locator('button:has-text("Home")');

    // ✅ Added-to-cart modal
    this.addedToCartModal = page.locator("sht-cart-noti");
    this.addedToCartCloseBtn = this.addedToCartModal.locator("button.close");

    // "View Cart" close button inside added-to-cart modal
    this.cartModalViewCart = page.locator(
      "div[class='dialog__header d-flex middle-xs between-xs'] button[aria-label='Close'] svg"
    );

    // Main cart items
    this.cartItems = page.locator(".cart-item");
    this.checkoutBtn = page.locator('button:has-text("Checkout")');

    // ✅ Discount popup
    // ✅ Discount popup wrapper (active modal)
    this.discountPopup = this.page.locator(
      "#deliveryAchievement.achievement-content"
    );

    // ✅ Title (HURRAY!)
    this.discountTitle = this.discountPopup.locator(".achievement-title");

    // ✅ Message (₹100 OFF / ₹200 OFF etc.)
    this.discountMessage = this.discountPopup.locator(
      ".achievement-message span"
    );

    this.popupClose = this.discountPopup.locator(
      "button.achievement-modal-close"
    );
  }

  async openCart() {
    const cartBtn = this.page.locator("#headerCartStatus");
    await cartBtn.scrollIntoViewIfNeeded();
    await cartBtn.click();
    await this.page.locator("#shtCartDrawer").waitFor({
      state: "visible",
      timeout: 10000,
    });
  }

  async clickViewCartFromModal() {
    if (await this.cartModalViewCart.isVisible()) {
      await this.cartModalViewCart.click();
      await this.page.waitForLoadState("domcontentloaded");
    }
  }

  /**
   * ✅ Handle the exact flow:
   * - Wait for Product Added modal → let it disappear
   * - Then wait for Discount popup to appear
   * - Finally assert the expected text
   */
  async verifyDiscountPopup(expectedText) {
    try {
      await expect(this.addedToCartModal).toBeVisible({ timeout: 3000 });
      await expect(this.addedToCartModal).toBeHidden({ timeout: 5000 });
    } catch {
      // continue if skipped
    }

    // Wait for discount modal
    await expect(this.discountPopup).toBeVisible({ timeout: 10000 });

    // Verify title
    await expect(this.discountTitle).toHaveText("HURRAY!");

    // Verify discount text (₹100 OFF / ₹200 OFF etc.)
    await expect(this.discountMessage).toHaveText(expectedText, {
      timeout: 5000,
    });
  }

  async closeDiscountPopup() {
    if (await this.popupClose.isVisible()) {
      await this.popupClose.click();
      await expect(this.discountPopup).toBeHidden({ timeout: 5000 });
    }
  }
}
