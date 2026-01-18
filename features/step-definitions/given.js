import { Given } from "@wdio/cucumber-framework";
import { expect } from "chai";
import productDetail from "../pageobjects/product.details.page.js";
import ProductsPage from "../pageobjects/Products.page.js";
import cartPage from "../pageobjects/cart.page.js";

// ====================
// GIVEN Steps
// ====================

// Launch the app and verify initial state
Given("I launch the Sauce Labs My Demo App", async () => {
  console.log("App launched successfully");
  await driver.pause(3000);
});

// Given I am on the "Products" screen
Given("I am on the {string} screen", async (screenName) => {
  console.log(`Verifying we're on the "${screenName}" screen`);
  if (screenName === "Products") {
    const isOnProductsScreen = await ProductsPage.verifyOnProductsScreen();
    expect(isOnProductsScreen).to.be.true;
    console.log("Successfully verified Products screen");
  }
  if (screenName === "Sauce Labs Backpack") {
    const isOnProductDetailScreen =
      await productDetail.verifyOnProductDetailScreen();
    expect(isOnProductDetailScreen).to.be.true;
    console.log("Successfully verified Sauce Labs Backpack screen");
  }
  if (screenName === "Cart") {
    const isOnCartScreen = await cartPage.verifyOnCartScreen();
    expect(isOnCartScreen).to.be.true;
    console.log("Successfully verified Cart screen");
  }
});
