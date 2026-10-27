// Central place for test configuration. Override with environment variables.
module.exports = {
  baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
  headless: process.env.HEADLESS === 'true',
  browser: process.env.BROWSER || 'chrome',
  implicitTimeout: 10000,
  users: {
    standard: { username: 'standard_user', password: 'secret_sauce' },
    lockedOut: { username: 'locked_out_user', password: 'secret_sauce' },
  },
};
