const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class LoginPage extends BasePage {
  static USERNAME = By.id('user-name');
  static PASSWORD = By.id('password');
  static LOGIN_BUTTON = By.id('login-button');
  static ERROR = By.css('[data-test="error"]');
  static MENU_BUTTON = By.id('react-burger-menu-btn');
  static LOGOUT_LINK = By.id('logout_sidebar_link');

  async load() {
    await this.open('/');
  }

  async loginAs(username, password) {
    if (username) await this.type(LoginPage.USERNAME, username);
    if (password) await this.type(LoginPage.PASSWORD, password);
    await this.click(LoginPage.LOGIN_BUTTON);
  }

  async getErrorMessage() {
    return this.getText(LoginPage.ERROR);
  }

  async logout() {
    await this.click(LoginPage.MENU_BUTTON);
    await this.click(LoginPage.LOGOUT_LINK);
  }

  async isLoginFormDisplayed() {
    return this.isPresent(LoginPage.LOGIN_BUTTON);
  }
}

module.exports = LoginPage;
