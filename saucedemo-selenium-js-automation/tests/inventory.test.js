const { expect } = require('chai');
const config = require('../config/config');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');

describe('Inventory', function () {
  let inventoryPage;

  beforeEach(async function () {
    const loginPage = new LoginPage(this.driver);
    inventoryPage = new InventoryPage(this.driver);
    await loginPage.load();
    await loginPage.loginAs(config.users.standard.username, config.users.standard.password);
  });

  it('TC-I01: displays all 6 products', async function () {
    expect(await inventoryPage.getProductCount()).to.equal(6);
  });

  it('TC-I02: sorts products by name A to Z', async function () {
    await inventoryPage.sortBy('az');
    const names = await inventoryPage.getProductNames();

    expect(names).to.deep.equal([...names].sort());
  });

  it('TC-I03: sorts products by name Z to A', async function () {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getProductNames();

    expect(names).to.deep.equal([...names].sort().reverse());
  });

  it('TC-I04: sorts products by price low to high', async function () {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getProductPrices();

    expect(prices).to.deep.equal([...prices].sort((a, b) => a - b));
  });

  it('TC-I05: sorts products by price high to low', async function () {
    await inventoryPage.sortBy('hilo');
    const prices = await inventoryPage.getProductPrices();

    expect(prices).to.deep.equal([...prices].sort((a, b) => b - a));
  });
});
