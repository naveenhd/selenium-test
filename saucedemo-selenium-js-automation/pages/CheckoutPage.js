const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class CheckoutPage extends BasePage {
  static FIRST_NAME = By.css('[data-test="firstName"]');
  static LAST_NAME = By.css('[data-test="lastName"]');
  static POSTAL_CODE = By.css('[data-test="postalCode"]');
  static CONTINUE_BUTTON = By.css('[data-test="continue"]');
  static FINISH_BUTTON = By.css('[data-test="finish"]');
  static ERROR = By.css('[data-test="error"]');
  static SUBTOTAL = By.css('.summary_subtotal_label');
  static COMPLETE_HEADER = By.css('.complete-header');

  async fillInformation(firstName, lastName, postalCode) {
    if (firstName) await this.type(CheckoutPage.FIRST_NAME, firstName);
    if (lastName) await this.type(CheckoutPage.LAST_NAME, lastName);
    if (postalCode) await this.type(CheckoutPage.POSTAL_CODE, postalCode);
    await this.click(CheckoutPage.CONTINUE_BUTTON);
  }

  async getErrorMessage() {
    return this.getText(CheckoutPage.ERROR);
  }

  async getSubtotalText() {
    return this.getText(CheckoutPage.SUBTOTAL);
  }

  async finish() {
    await this.click(CheckoutPage.FINISH_BUTTON);
  }

  async getConfirmationMessage() {
    return this.getText(CheckoutPage.COMPLETE_HEADER);
  }
}

module.exports = CheckoutPage;
