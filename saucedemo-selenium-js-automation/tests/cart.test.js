const { expect } = require('chai');
const config = require('../config/config');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');

const BACKPACK = 'Sauce Labs Backpack';
const BIKE_LIGHT = 'Sauce Labs Bike Light';

describe('Shopping cart', function () {
  let inventoryPage;
  let cartPage;

  beforeEach(async function () {
    const loginPage = new LoginPage(this.driver);
    inventoryPage = new InventoryPage(this.driver);
    cartPage = new CartPage(this.driver);
    await loginPage.load();
    await loginPage.loginAs(config.users.standard.username, config.users.standard.password);
  });

  it('TC-C01: adding one item sets the cart badge to 1', async function () {
    await inventoryPage.addToCart(BACKPACK);

    expect(await inventoryPage.getCartCount()).to.equal(1);
  });

  it('TC-C02: adding two items sets the cart badge to 2', async function () {
    await inventoryPage.addToCart(BACKPACK);
    await inventoryPage.addToCart(BIKE_LIGHT);

    expect(await inventoryPage.getCartCount()).to.equal(2);
  });

  it('TC-C03: removing an item clears the cart badge', async function () {
    await inventoryPage.addToCart(BACKPACK);
    await inventoryPage.removeFromCart(BACKPACK);

    expect(await inventoryPage.getCartCount()).to.equal(0);
  });

  it('TC-C04: cart page lists the items that were added', async function () {
    await inventoryPage.addToCart(BACKPACK);
    await inventoryPage.addToCart(BIKE_LIGHT);
    await inventoryPage.openCart();

    expect(await cartPage.getTitle()).to.equal('Your Cart');
    expect(await cartPage.getItemNames()).to.have.members([BACKPACK, BIKE_LIGHT]);
  });
});
