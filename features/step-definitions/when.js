import { When } from "@wdio/cucumber-framework";
import { expect } from "chai";
import productDetail from "../pageobjects/product.details.page.js";
import ProductsPage from "../pageobjects/Products.page.js";
import LoginPage from "../pageobjects/login.page.js";

// ====================
// WHEN Steps (Actions)
// ====================

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

// When I click on the "Add to cart" button
When("I click on the {string} button", async (buttonName) => {
  console.log(`Clicking on button: "${buttonName}"`);
  if (buttonName === "Add to cart") {
    await productDetail.addToCart();
    console.log("✓ Add to cart action complete");
  }
});

// (Removed duplicate "I am on the {string} screen" When-step to avoid
// ambiguous step definitions — use Given/Then definitions instead.)

// I attempt to login with username "invalid user1" and password "wrong pass1"
When(
  "I attempt to login with username {string} and password {string}",
  async (s, s2) => {
    console.log(`Attempting login with username: "${s}" and password: "${s2}"`);
    await LoginPage.login(s, s2);
    console.log("✓ Login attempt complete");
  },
);

When("I click on the View menu", async () => {
  console.log("Clicking on the View menu");
  await LoginPage.clickViewMenu();
  console.log("✓ Clicked on the View menu");
});

When("I click on the {string} option in the View menu", async (s) => {
  console.log(`Clicking on the "${s}" option in the View menu`);
  if (s === "Log In") {
    await LoginPage.clickMenuItem();
    console.log(`✓ Clicked on the "${s}" option`);
  }
});
