const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const config = require('../config/config');

/**
 * Creates a new Chrome WebDriver instance.
 * Selenium Manager (bundled with selenium-webdriver 4.6+) downloads the
 * matching chromedriver automatically, so no manual driver setup is needed.
 */
async function buildDriver() {
  const options = new chrome.Options();
  options.addArguments('--window-size=1920,1080', '--disable-notifications');

  // Turn off Chrome's password manager / leak-detection pop-ups
  options.setUserPreferences({
    credentials_enable_service: false,
    'profile.password_manager_enabled': false,
    'profile.password_manager_leak_detection': false,
  });

  if (config.headless) {
    options.addArguments('--headless=new', '--no-sandbox', '--disable-dev-shm-usage');
  }

  const driver = await new Builder().forBrowser(config.browser).setChromeOptions(options).build();
  await driver.manage().setTimeouts({ implicit: 0, pageLoad: 30000 });
  return driver;
}

module.exports = { buildDriver };
