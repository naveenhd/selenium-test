const { until } = require('selenium-webdriver');
const config = require('../config/config');

/** Shared helpers used by all page objects. */
class BasePage {
  constructor(driver) {
    this.driver = driver;
    this.timeout = config.implicitTimeout;
  }

  async open(path = '') {
    await this.driver.get(`${config.baseUrl}${path}`);
  }

  async find(locator) {
    const element = await this.driver.wait(until.elementLocated(locator), this.timeout);
    await this.driver.wait(until.elementIsVisible(element), this.timeout);
    return element;
  }

  async findAll(locator) {
    return this.driver.findElements(locator);
  }

  async click(locator) {
    const element = await this.find(locator);
    await this.driver.wait(until.elementIsEnabled(element), this.timeout);
    await element.click();
  }

  async type(locator, text) {
    const element = await this.find(locator);
    await element.clear();
    await element.sendKeys(text);
  }

  async getText(locator) {
    return (await this.find(locator)).getText();
  }

  async isPresent(locator) {
    return (await this.driver.findElements(locator)).length > 0;
  }

  async getCurrentUrl() {
    return this.driver.getCurrentUrl();
  }
}

module.exports = BasePage;
