const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class InventoryPage extends BasePage {
  static TITLE = By.css('.title');
  static ITEMS = By.css('.inventory_item');
  static ITEM_NAMES = By.css('.inventory_item_name');
  static ITEM_PRICES = By.css('.inventory_item_price');
  static SORT_DROPDOWN = By.css('[data-test="product-sort-container"]');
  static CART_BADGE = By.css('.shopping_cart_badge');
  static CART_LINK = By.css('.shopping_cart_link');

  /** Converts a product name to the data-test suffix, e.g. "Sauce Labs Backpack" -> "sauce-labs-backpack". */
  static slug(productName) {
    return productName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  async getTitle() {
    return this.getText(InventoryPage.TITLE);
  }

  async getProductCount() {
    await this.find(InventoryPage.ITEMS);
    return (await this.findAll(InventoryPage.ITEMS)).length;
  }

  async getProductNames() {
    const elements = await this.findAll(InventoryPage.ITEM_NAMES);
    return Promise.all(elements.map((el) => el.getText()));
  }

  async getProductPrices() {
    const elements = await this.findAll(InventoryPage.ITEM_PRICES);
    const texts = await Promise.all(elements.map((el) => el.getText()));
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }

  /** @param {'az'|'za'|'lohi'|'hilo'} value */
  async sortBy(value) {
    await this.find(InventoryPage.SORT_DROPDOWN);
    await this.click(By.css(`[data-test="product-sort-container"] option[value="${value}"]`));
  }

  async addToCart(productName) {
    await this.click(By.css(`[data-test="add-to-cart-${InventoryPage.slug(productName)}"]`));
  }

  async removeFromCart(productName) {
    await this.click(By.css(`[data-test="remove-${InventoryPage.slug(productName)}"]`));
  }

  async getCartCount() {
    if (!(await this.isPresent(InventoryPage.CART_BADGE))) return 0;
    return parseInt(await this.getText(InventoryPage.CART_BADGE), 10);
  }

  async openCart() {
    await this.click(InventoryPage.CART_LINK);
  }
}

module.exports = InventoryPage;
