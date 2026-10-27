const { expect } = require('chai');
const config = require('../config/config');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutPage = require('../pages/CheckoutPage');

const BACKPACK = 'Sauce Labs Backpack'; // price: $29.99

describe('Checkout', function () {
  let checkoutPage;

  beforeEach(async function () {
    const loginPage = new LoginPage(this.driver);
    const inventoryPage = new InventoryPage(this.driver);
    const cartPage = new CartPage(this.driver);
    checkoutPage = new CheckoutPage(this.driver);

    await loginPage.load();
    await loginPage.loginAs(config.users.standard.username, config.users.standard.password);
    await inventoryPage.addToCart(BACKPACK);
    await inventoryPage.openCart();
    await cartPage.proceedToCheckout();
  });

  it('TC-O01: user can complete an order end to end', async function () {
    await checkoutPage.fillInformation('Naveen', 'Kumar', '560001');

    expect(await checkoutPage.getSubtotalText()).to.include('$29.99');

    await checkoutPage.finish();
    expect(await checkoutPage.getConfirmationMessage()).to.equal('Thank you for your order!');
  });

  it('TC-O02: first name is required', async function () {
    await checkoutPage.fillInformation('', 'Kumar', '560001');

    expect(await checkoutPage.getErrorMessage()).to.include('First Name is required');
  });

  it('TC-O03: last name is required', async function () {
    await checkoutPage.fillInformation('Naveen', '', '560001');

    expect(await checkoutPage.getErrorMessage()).to.include('Last Name is required');
  });

  it('TC-O04: postal code is required', async function () {
    await checkoutPage.fillInformation('Naveen', 'Kumar', '');

    expect(await checkoutPage.getErrorMessage()).to.include('Postal Code is required');
  });
});
