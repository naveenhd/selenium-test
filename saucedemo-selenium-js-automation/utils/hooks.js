// Mocha root hooks: every test gets a fresh browser (this.driver) and a
// screenshot is saved automatically when a test fails.
const fs = require('fs');
const path = require('path');
const { buildDriver } = require('./driver');

const SCREENSHOT_DIR = path.join(__dirname, '..', 'screenshots');

exports.mochaHooks = {
  async beforeEach() {
    this.driver = await buildDriver();
  },

  async afterEach() {
    if (this.currentTest && this.currentTest.state === 'failed' && this.driver) {
      try {
        fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
        const safeName = this.currentTest.fullTitle().replace(/[^a-z0-9]+/gi, '_').slice(0, 120);
        const image = await this.driver.takeScreenshot();
        fs.writeFileSync(path.join(SCREENSHOT_DIR, `${safeName}.png`), image, 'base64');
      } catch (err) {
        console.error('Could not capture screenshot:', err.message);
      }
    }
    if (this.driver) {
      await this.driver.quit();
    }
  },
};
