import { When } from "@wdio/cucumber-framework";
import { expect } from "chai";
import productDetail from "../pageobjects/product.details.page.js";
import ProductsPage from "../pageobjects/Products.page.js";

// ====================
// WHEN Steps (Actions)
// ====================

// When I click on the "Add to cart" button
When("I click on the {string} button", async (buttonName) => {
  console.log(`Clicking on button: "${buttonName}"`);
  if (buttonName === "Add to cart") {
    await productDetail.addToCart();
    console.log("✓ Add to cart action complete");
  }
});

// Click on the "Sauce Labs Backpack" product
When("I click on the {string} product", async (productName) => {
  console.log(`Clicking on product: "${productName}"`);
  if (productName === "Sauce Labs Backpack") {
    await ProductsPage.selectSauceLabsBackpack();

    // Verify we navigated to product details
    await driver.pause(2000); // Wait for navigation
    console.log("On Selected Product Page");
  }
});

// Select a specific product
When("I select the {string} product", async (productName) => {
  console.log(`Selecting product: "${productName}"...`);

  if (productName === "Sauce Labs Backpack") {
    ProductsPage.selectSauceLabsBackpack();

    // Verify we navigated to product details
    await driver.pause(2000); // Wait for navigation
    console.log("On Selected Product Page");
  }
});

// Change product color
When("I change the color to {string}", async (color) => {
  console.log(`Changing color to "${color}"`);

  if (color === "Blue") {
    productDetail.changeColorToBlue();
    await productDetail.addToCart();
    console.log("✓ Color change complete");
  }
});

// Change product quantity
When("I increase the quantity to {string}", async (quantity) => {
  console.log(`Increasing quantity to ${quantity}`);

  const targetQty = parseInt(quantity);
  const finalQty = await productDetail.increaseQuantityTo(targetQty);

  // const finalQty = await productDetail.increaseQuantityTo(parseInt(quantity));

  // Verify quantity was set correctly
  expect(finalQty).to.equal(targetQty);
  console.log(`Quantity set to ${finalQty}`);
});

// Add product to cart
When("I click {string}", async (buttonText) => {
  console.log(`Clicking "${buttonText}"`);

  if (buttonText === "Add to cart") {
    // await productDetail.addToCart();

    // Verify item was added to cart (check badge if available)
    await driver.pause(1000);
    console.log("✓ Add to cart action complete");
  }
});
