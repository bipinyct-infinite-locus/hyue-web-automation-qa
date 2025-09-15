// tests/search.spec.js
import { test, expect } from '@playwright/test';
import { SearchPage } from '../pages/SearchPage';

test.describe('Search functionality', () => {
  test('User can search for a product', async ({ page }) => {
    const searchPage = new SearchPage(page);

    await searchPage.navigate('/'); // coming from BasePage
    await searchPage.searchForProduct('Lipstick');

    // search-bar.spec.js

    const count = await searchPage.getSearchResultsCount();
    console.log(`Found ${count} results for 'Lipstick'`);

    
  });
});
