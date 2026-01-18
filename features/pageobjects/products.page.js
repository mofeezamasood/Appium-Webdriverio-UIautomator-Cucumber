import { $ } from "@wdio/globals";
import { default as Page } from "./page.js";

// Products Page Object Model
// Contains all selectors and methods for the Products screen

class ProductsPage extends Page {
  // ====================
  // SELECTORS
  // ====================

  // Sauce Labs Backpack product - find by product name
  get sauceLabsBackpack() {
    return $('(//android.widget.ImageView[@content-desc="Product Image"])[1]');
  }

  // Header title to verify we're on Products screen
  get productsHeader() {
    return $('//android.widget.TextView[@content-desc="title"]');
  }

  // ====================
  // PAGE METHODS
  // ====================

  async verifyOnProductsScreen() {
    try {
      // Wait for products header to be displayed
      return await this.productsHeader.waitForDisplayed();
    } catch (error) {
      console.error("Error verifying Products screen:", error.message);
      return false;
    }
  }

  // Select Sauce Labs Backpack product
  async selectSauceLabsBackpack() {
    console.log("Selecting Sauce Labs Backpack");

    // Click on the product
    await this.sauceLabsBackpack.click();

    console.log("Sauce Labs Backpack selected successfully");
  }
}

export default new ProductsPage();
