// pages/DashboardPage.js
export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.tickerNext = page.locator("button.jjs-anmb-control-next svg");
    this.tickerPrev = page.locator("button.jjs-anmb-control-prev svg");
    this.bannerNext = page.locator(
      "body > main:nth-child(6) > div:nth-child(1) > div:nth-child(1) > sht-slideshow:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > button:nth-child(2) > svg:nth-child(1)"
    );
    this.bannerPrev = page.locator(
      "body > main:nth-child(6) > div:nth-child(1) > div:nth-child(1) > sht-slideshow:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > button:nth-child(2) > svg:nth-child(1)"
    );
    this.heroViewAll = page.locator(
      "body > main:nth-child(6) > div:nth-child(1) > div:nth-child(1) > sht-slideshow:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > a:nth-child(1)"
    );
  }

  async navigateToDashboard(baseURL) {
    await this.page.goto(baseURL || "/");
  }

  async navigateTicker() {
    await this.tickerNext.click();
    await this.tickerPrev.click();
  }

  async scrollHeroBanner() {
    await this.bannerNext.click();
    await this.bannerPrev.click();
  }

  async clickViewAllProducts() {
    await this.heroViewAll.click();
  }

  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    // wait for something at the end to load
    await this.page.waitForSelector(".footer", { timeout: 20000 });
  }

  // async selectProductByName(productName) {
  //   // 🔑 Flexible: locates product card by visible text
  //   await this.page.locator(`.product-card:has-text("${productName}")`).first().click();
  // }
}
