# SauceDemo Selenium Test Automation (JavaScript)

Automated end-to-end tests for the demo e-commerce site [saucedemo.com](https://www.saucedemo.com), built with **Selenium WebDriver**, **JavaScript**, **Mocha** and **Chai**, using the **Page Object Model (POM)** design pattern. Tests run automatically on every push with **GitHub Actions**.

## Tech stack

| Area | Tool |
|------|------|
| Browser automation | Selenium WebDriver (`selenium-webdriver` 4) |
| Language | JavaScript (Node.js 18+) |
| Test runner | Mocha |
| Assertions | Chai |
| Reporting | Mochawesome (HTML report) |
| CI | GitHub Actions |

## What is covered (19 test cases)

| Suite | Test IDs | Scenarios |
|-------|----------|-----------|
| Login | TC-L01 to L06 | valid login, wrong password, locked-out user, empty username, empty password, logout |
| Inventory | TC-I01 to I05 | product count, sort by name (A-Z, Z-A), sort by price (low-high, high-low) |
| Cart | TC-C01 to C04 | add one/two items, remove item, cart page contents |
| Checkout | TC-O01 to O04 | full order flow with total check, required-field validation (first name, last name, postal code) |

## Project structure

```
.
├── config/config.js        # base URL, users, headless flag
├── pages/                  # Page Objects (one class per page)
│   ├── BasePage.js         # shared waits and actions
│   ├── LoginPage.js
│   ├── InventoryPage.js
│   ├── CartPage.js
│   └── CheckoutPage.js
├── tests/                  # test suites (what to verify)
│   ├── login.test.js
│   ├── inventory.test.js
│   ├── cart.test.js
│   └── checkout.test.js
├── utils/
│   ├── driver.js           # Chrome driver setup
│   └── hooks.js            # fresh browser per test + screenshot on failure
├── .github/workflows/tests.yml
└── .mocharc.js
```

## Design choices

- **Page Object Model:** locators and page actions live in `pages/`; tests only describe behaviour, so a UI change means updating one file.
- **Explicit waits:** no `sleep()` calls; elements are awaited with `until.elementLocated` / `elementIsVisible`.
- **Independent tests:** each test starts a fresh browser and logs in itself, so tests can run in any order.
- **Screenshot on failure:** saved to `screenshots/` automatically.
- **Stable locators:** uses the site's `data-test` attributes and IDs rather than fragile XPath.

## Prerequisites

- [Node.js](https://nodejs.org) 18 or later
- Google Chrome installed (chromedriver is downloaded automatically by Selenium Manager)

## Run the tests

```bash
git clone https://github.com/<your-username>/saucedemo-selenium-js-automation.git
cd saucedemo-selenium-js-automation
npm install

npm test                 # run all tests with a visible browser
npm run test:headless    # run without opening a browser window
npm run test:login       # run a single suite (also: inventory, cart, checkout)
npm run test:report      # headless run + HTML report in reports/report.html
```

On Windows PowerShell, use `$env:HEADLESS="true"; npm test` instead of `npm run test:headless`.

## Continuous integration

`.github/workflows/tests.yml` runs the suite in headless Chrome on every push and pull request, then uploads the HTML report (and failure screenshots) as downloadable artifacts under the **Actions** tab.

## Author

Naveen Kumar H D, Electronics and Communication Engineering graduate
