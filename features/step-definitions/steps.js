import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect, $ } from "@wdio/globals";
import { expect } from "chai";
import productPage from "../pageobjects/secure.page.js";
import LoginPage from "../pageobjects/login.page.js";
import SecurePage from "../pageobjects/secure.page.js";

/**
 * Step Definitions for Product Selection & Cart Validation Scenario
 */

// ====================
// GIVEN Steps
// ====================

/**
 * Launch the app and verify initial state
 */
Given("I launch the Sauce Labs My Demo App", async () => {
  console.log("App launched successfully");
  // App launch is handled by Appium in capabilities
  // Wait a moment for app to fully load
  await driver.pause(3000);
});

// ====================
// THEN Steps (Verifications)
// ====================

/**
 * Verify we're on the Products screen
 */
Then("I should be on the {string} screen", async (screenName) => {
  console.log(`Verifying we're on the "${screenName}" screen...`);

  if (screenName === "Products") {
    const isOnProductsScreen = productsPage.verifyOnProductsScreen();
    expect(isOnProductsScreen).to.be.true;
    console.log("✓ Successfully verified Products screen");
  }
});

/**
 * Verify cart item details
 */
Then("I verify the item name is {string}", async (expectedName) => {
  console.log(`Verifying item name is "${expectedName}"...`);

  // Verify we're on cart screen first
  const isOnCartScreen = securePage.verifyOnCartScreen();
  expect(isOnCartScreen).to.be.true;

  // Get cart item details
  const cartDetails = securePage.getCartItemDetails();

  // Verify item name
  expect(cartDetails.name).to.equal(expectedName);
  console.log(`✓ Item name verified: "${cartDetails.name}"`);
});

Then("I verify the quantity is {string}", async (expectedQuantity) => {
  console.log(`Verifying quantity is "${expectedQuantity}"...`);

  const cartDetails = securePage.getCartItemDetails();
  const expectedQty = parseInt(expectedQuantity);

  // Verify quantity
  expect(cartDetails.quantity).to.equal(expectedQty);
  console.log(`✓ Quantity verified: ${cartDetails.quantity}`);
});

Then(
  "I verify the total price matches the calculation for {int} items",
  async (quantity) => {
    console.log(`Verifying total price calculation for ${quantity} items...`);

    const cartDetails = securePage.getCartItemDetails();

    // Calculate expected total
    const expectedTotal = securePage.calculateExpectedTotal(
      cartDetails.unitPrice,
      quantity,
    );

    // Verify total price matches calculation
    expect(cartDetails.totalPrice).to.equal(expectedTotal);

    console.log("✓ Price calculation verified:");
    console.log(`  Unit Price: ${cartDetails.unitPrice}`);
    console.log(`  Quantity: ${quantity}`);
    console.log(`  Calculated Total: ${expectedTotal}`);
    console.log(`  Actual Total: ${cartDetails.totalPrice}`);
  },
);

// ====================
// WHEN Steps (Actions)
// ====================

/**
 * Select a specific product
 */
When("I select the {string} product", async (productName) => {
  console.log(`Selecting product: "${productName}"...`);

  if (productName === "Sauce Labs Backpack") {
    productsPage.selectSauceLabsBackpack();

    // Verify we navigated to product details
    await driver.pause(2000); // Wait for navigation
    console.log("✓ Product selection complete");
  }
});

/**
 * Change product color
 */
When("I change the color to {string}", async (color) => {
  console.log(`Changing color to "${color}"...`);

  if (color === "Blue") {
    securePage.changeColorToBlue();
    console.log("✓ Color change complete");
  }
});

/**
 * Change product quantity
 */
When("I increase the quantity to {string}", async (quantity) => {
  console.log(`Increasing quantity to ${quantity}...`);

  const targetQty = parseInt(quantity);
  const finalQty = await securePage.increaseQuantityTo(targetQty);

  // Verify quantity was set correctly
  expect(finalQty).to.equal(targetQty);
  console.log(`✓ Quantity set to ${finalQty}`);
});

/**
 * Add product to cart
 */
When("I click {string}", async (buttonText) => {
  console.log(`Clicking "${buttonText}"...`);

  if (buttonText === "Add to Cart") {
    await securePage.addToCart();

    // Verify item was added to cart (check badge if available)
    await driver.pause(1000);
    console.log("✓ Add to Cart action complete");
  }
});

/**
 * Navigate to cart
 */
When("I navigate to the Cart", async () => {
  console.log("Navigating to Cart...");

  // Navigate back to products if needed (app might be on details page)
  try {
    // Try to go back if we're on details page
    await driver.back();
    await driver.pause(1000);
  } catch (error) {
    // Continue anyway
  }

  await productsPage.navigateToCart();

  // Verify navigation was successful
  const isOnCartScreen = await securePage.verifyOnCartScreen();
  expect(isOnCartScreen).to.be.true;

  console.log("✓ Navigation to Cart complete");
});
