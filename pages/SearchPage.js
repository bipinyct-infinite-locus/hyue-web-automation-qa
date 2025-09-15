// pages/SearchPage.js

export class SearchPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.locator('#searchInHeader');
    // this.searchButton = page.locator('#searchButton');
    this.results = page.locator('.search-results .product-card');
  }

  async navigate(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  async searchForProduct(productName) {
    await this.searchInput.fill(productName);
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('networkidle');
  }

  async getSearchResultsCount() {
    return await this.results.count();
  }

  async getFirstResultText() {
    return await this.results.first().innerText();
  }
}
