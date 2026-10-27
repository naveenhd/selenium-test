const { expect } = require('chai');
const config = require('../config/config');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');

describe('Login', function () {
  let loginPage;
  let inventoryPage;

  beforeEach(async function () {
    loginPage = new LoginPage(this.driver);
    inventoryPage = new InventoryPage(this.driver);
    await loginPage.load();
  });

  it('TC-L01: valid user can log in and sees the products page', async function () {
    const { username, password } = config.users.standard;
    await loginPage.loginAs(username, password);

    expect(await inventoryPage.getTitle()).to.equal('Products');
    expect(await loginPage.getCurrentUrl()).to.include('/inventory.html');
  });

  it('TC-L02: wrong password shows an error message', async function () {
    await loginPage.loginAs(config.users.standard.username, 'wrong_password');

    expect(await loginPage.getErrorMessage()).to.include('Username and password do not match');
  });

  it('TC-L03: locked-out user cannot log in', async function () {
    const { username, password } = config.users.lockedOut;
    await loginPage.loginAs(username, password);

    expect(await loginPage.getErrorMessage()).to.include('this user has been locked out');
  });

  it('TC-L04: empty username shows "Username is required"', async function () {
    await loginPage.loginAs('', config.users.standard.password);

    expect(await loginPage.getErrorMessage()).to.include('Username is required');
  });

  it('TC-L05: empty password shows "Password is required"', async function () {
    await loginPage.loginAs(config.users.standard.username, '');

    expect(await loginPage.getErrorMessage()).to.include('Password is required');
  });

  it('TC-L06: logged-in user can log out', async function () {
    const { username, password } = config.users.standard;
    await loginPage.loginAs(username, password);
    await loginPage.logout();

    expect(await loginPage.isLoginFormDisplayed()).to.be.true;
  });
});
