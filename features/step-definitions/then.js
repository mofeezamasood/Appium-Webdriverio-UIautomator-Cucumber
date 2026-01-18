import { Then } from "@wdio/cucumber-framework";
import { expect } from "chai";
import ProductDetailsPage from "../pageobjects/product.details.page.js";
import ProductsPage from "../pageobjects/Products.page.js";
import cartPage from "../pageobjects/cart.page.js";

// ====================
// THEN Steps (Verifications)
// ====================

// I should see that the cart number was updated to "2" in the cart icon
Then(
  "I should see that the cart number was updated to {string} in the cart icon",
  async (cartItemQuantity) => {
    console.log("Verifying item was added to cart");

    // Check for cart badge or confirmation message
    const itemIsAdded = await ProductDetailsPage.verifyCartNumber();
    expect(itemIsAdded).to.be.equal(cartItemQuantity);

    console.log("✓ Item addition to cart verified");
  },
);

// Verify we're on the Products screen
Then("I should be on the {string} screen", async (screenName) => {
  console.log(`Verifying we're on the "${screenName}" screen`);

  if (screenName === "Products") {
    const isOnProductsScreen = await ProductsPage.verifyOnProductsScreen();
    expect(isOnProductsScreen).to.be.true;
    console.log("Successfully verified Products screen");
  }
});

// I verify the item name in cart is "Sauce Labs Backpack"
Then("I verify the item name in cart is {string}", async (expectedName) => {
  console.log(`Verifying item name is "${expectedName}"`);
  const actualName = await cartPage.getItemName();
  expect(actualName).to.equal(expectedName);
  console.log("✓ Item name verified successfully");
});

// I verify the quantity of the item in the cart is "2"
Then(
  "I verify the quantity of the item in the cart is {string}",
  async (expectedQuantity) => {
    console.log(`Verifying item quantity is "${expectedQuantity}"`);
    const actualQuantity = await cartPage.itemQuantityInCart();
    expect(actualQuantity).to.equal(expectedQuantity);
    console.log("✓ Item quantity verified successfully");
  },
);

// I navigate to the "Cart" screen
Then("I navigate to the {string} screen", async (screenName) => {
  console.log(`Navigating to the "${screenName}" screen`);

  if (screenName === "My Cart") {
    await ProductDetailsPage.openCart();
    const isOnCartScreen = await cartPage.verifyOnCartScreen();
    expect(isOnCartScreen).to.be.true;
    console.log("Successfully navigated to Cart screen");
  }
});

// I verify the total price matches the calculation for 2 items
Then(
  "I verify the total price matches the calculation for {string} items",
  async (quantityStr) => {
    const quantity = parseInt(quantityStr);
    console.log(`Verifying total price for quantity: ${quantity}`);

    // Get cart item details
    const isTotalCorrect = await cartPage.verifyTotal(quantity);

    expect(isTotalCorrect).to.be.true;
    console.log("✓ Total price verified successfully");
  },
);
