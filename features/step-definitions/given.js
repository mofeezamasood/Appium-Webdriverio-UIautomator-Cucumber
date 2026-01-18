import { Given, When, Then } from "@wdio/cucumber-framework";
import { $ } from "@wdio/globals";
import { expect } from "chai";

// ====================
// GIVEN Steps
// ====================

// Launch the app and verify initial state
Given("I launch the Sauce Labs My Demo App", async () => {
  console.log("App launched successfully");
  // App launch is handled by Appium in capabilities
  // Wait a moment for app to fully load
  await driver.pause(3000);
});

// Given I am on the "Products" screen
Given("I am on the {string} screen", async (screenName) => {
  console.log(`Verifying we're on the "${screenName}" screen`);
  if (screenName === "Products") {
    const isOnProductsScreen = await mainPage.verifyOnProductsScreen();
    expect(isOnProductsScreen).to.be.true;
    console.log("Successfully verified Products screen");
  }
  if (screenName === "Sauce Labs Backpack") {
    const isOnProductDetailScreen =
      await productDetail.verifyOnProductDetailScreen();
    expect(isOnProductDetailScreen).to.be.true;
    console.log("Successfully verified Sauce Labs Backpack screen");
  }
});
