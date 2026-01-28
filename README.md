# Mobile Automation — Appium + WebdriverIO + Cucumber (BDD)

This repository is an example automation assignment for the Sauce Labs My Demo App (Android). It demonstrates a Page Object Model (POM) based WebdriverIO + Appium framework with Cucumber for BDD, focused on maintainability and mobile-specific best practices.

## Objective

Automate end-to-end mobile scenarios for the Sauce Labs My Demo App (Android): product selection & cart validation, data-driven login, and a deep-link/swipe technical challenge.

## Tech stack

- Node.js + npm
- WebdriverIO (v7+ / v8+) test runner
- Appium (server)
- Cucumber (Gherkin) for BDD
- Page Object Model (POM)
- Reporting: (suggested) Allure or ExtentReports

## Repo structure (key files)

- [wdio.conf.js](wdio.conf.js) — WebdriverIO configuration and capabilities.
- [features](features) — Cucumber feature files and page objects.
  - [features/product.feature](features/product.feature) — Product selection scenario.
  - [features/login.feature](features/login.feature) — Data-driven login scenario.
  - [features/deeplink.feature](features/deeplink.feature) — Deep link & swipe scenario.
- [features/pageobjects](features/pageobjects) — Page Objects (POM) for screens.
  - [features/pageobjects/Products.page.js](features/pageobjects/Products.page.js)
  - [features/pageobjects/product.details.page.js](features/pageobjects/product.details.page.js)
  - [features/pageobjects/cart.page.js](features/pageobjects/cart.page.js)
- [features/step-definitions](features/step-definitions) — Cucumber step implementations.
- [reports/html-reports/screenshots](reports/html-reports/screenshots) — Failure screenshots.

## Prerequisites

- Node.js (16+ recommended) and npm
- Appium server installed globally or run via npx: `npm install -g appium` or `npx appium`
- Android SDK + adb and a configured emulator or a connected device
- Java (for some Appium setups / Android tooling)

## Install

Clone the repo and install dependencies:

```bash
git clone <your-repo-url>
cd Webdriverio
npm install
```

## Configuration

- Edit `wdio.conf.js` to point to your Appium server and desired capabilities.
- You can extract capabilities to a `capabilities.json` or environment-specific config and load them from `wdio.conf.js`.
- Ensure `app` capability points to the Sauce Labs My Demo App `.apk` or the package/activity for an installed app.

Files you will likely change:

- [wdio.conf.js](wdio.conf.js)
- Any capability/config file you create (e.g., `capabilities.json`)

## Run tests

- Start Appium (if not using a cloud provider):

```bash
npx appium
```

- Run the full suite:

```bash
npm run wdio
```

- Run a single feature (example):

```bash
npx wdio run wdio.conf.js --spec features/login.feature
```

## Reporting

- The project captures screenshots on failure to `reports/html-reports/screenshots`.
- Integrate Allure (recommended):

```bash
# after test run
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

If you want, I can add an Allure configuration and a `npm` script to generate and open reports automatically.

## Framework notes & best practices used

- Page Object Model (POM): UI locators and page actions are grouped inside `features/pageobjects`.
- Synchronization: explicit waits (Expected Conditions / `waitUntil`) are used. Avoid `Thread.sleep`.
- Locators: prefer Accessibility IDs or Resource IDs for stability; avoid brittle XPaths.
- Screenshots: automatically captured on failures and stored in the `reports` folder.

## What I learned while building this

- Designing a POM-based structure for mobile apps.
- Writing readable Gherkin scenarios for BDD with Cucumber.
- Implementing data-driven tests for login flows.
- Handling mobile gestures (swipe/scroll) and deep links.
- Robust synchronization using explicit waits.

## Next improvements / suggested roadmap

1. Add Allure or ExtentReports integration and auto-screenshot attachments.
2. Add CI (GitHub Actions) to run tests on push/PR and publish reports.
3. Integrate cloud device providers (Sauce Labs, BrowserStack) for cross-device runs.
4. Add parallelization and retry strategies to improve execution time and flakiness handling.
5. Add sample `capabilities.json` and environment profiles for local vs cloud runs.

## Useful commands summary

```bash
npm install
npx appium                       # start Appium server
npm run wdio                     # run full suite
npx wdio run wdio.conf.js --spec features/product.feature   # run single feature
npx allure generate ... && npx allure open ...   # generate/open Allure report
```

## Contact / Questions

If you want, I can also:

- add Allure integration and a `reports` script
- scaffold GitHub Actions for CI
- create a `capabilities.json` with example Android capabilities

---

Created for the Appium Automation Challenge: Mobile E-Commerce.
