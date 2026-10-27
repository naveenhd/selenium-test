const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class CartPage extends BasePage {
  static TITLE = By.css('.title');
  static ITEM_NAMES = By.css('.cart_item .inventory_item_name');
  static CHECKOUT_BUTTON = By.css('[data-test="checkout"]');

  async getTitle() {
    return this.getText(CartPage.TITLE);
  }

  async getItemNames() {
    await this.find(CartPage.TITLE);
    const elements = await this.findAll(CartPage.ITEM_NAMES);
    return Promise.all(elements.map((el) => el.getText()));
  }

  async proceedToCheckout() {
    await this.click(CartPage.CHECKOUT_BUTTON);
  }
}

module.exports = CartPage;
