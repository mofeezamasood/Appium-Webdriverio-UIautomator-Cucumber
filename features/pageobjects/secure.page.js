import { $ } from "@wdio/globals";
import Page from "./page.js";

/**
 * Product Details & Cart Page Object Model
 * Contains all selectors and methods for product details and cart screens
 */
class SecurePage extends Page {
  // ====================
  // SELECTORS - PRODUCT DETAILS
  // ====================

  /**
   * Product name on details page
   */
  get productName() {
    return $(
      '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/productTV"]',
    );
  }

  /**
   * Blue color option
   */
  get blueColorOption() {
    return $("//android.widget.ImageView[@content-desc='Blue color']");
  }

  /**
   * Quantity increase button (+)
   */
  get quantityIncreaseButton() {
    return $(
      '//android.widget.ImageView[@content-desc="Increase item quantity"]',
    );
  }

  /**
   * Quantity display
   */
  get quantityDisplay() {
    return $(
      "//android.widget.TextView[@resource-id='com.saucelabs.mydemoapp.android:id/noTV']",
    );
  }

  /**
   * Add to cart button
   */
  get addToCartButton() {
    return $(
      "//android.widget.Button[@content-desc='Tap to add product to cart']",
    );
  }

  /**
   * Price display on details page
   */
  get productPrice() {
    return $(
      "//android.widget.TextView[@resource-id='com.saucelabs.mydemoapp.android:id/priceTV']",
    );
  }

  // ====================
  // SELECTORS - CART SCREEN
  // ====================

  /**
   * Cart screen header
   */
  get cartHeader() {
    return $(
      "//android.widget.TextView[@resource-id='com.saucelabs.mydemoapp.android:id/productTV']",
    );
  }

  /**
   * Cart item name
   */
  get cartItemName() {
    return $(
      "//android.widget.TextView[@resource-id='com.saucelabs.mydemoapp.android:id/titleTV']",
    );
  }

  /**
   * Cart item quantity
   */
  get cartItemQuantity() {
    return $(
      "//android.widget.TextView[@resource-id='com.saucelabs.mydemoapp.android:id/noTV']",
    );
  }

  /**
   * Cart item total price
   */
  get cartItemTotalPrice() {
    return $(
      "//android.widget.TextView[@resource-id='com.saucelabs.mydemoapp.android:id/totalPriceTV']",
    );
  }

  /**
   * Cart item price per unit
   */
  get cartItemUnitPrice() {
    return $(
      "//android.widget.TextView[@resource-id='com.saucelabs.mydemoapp.android:id/priceTV']",
    );
  }

  // ====================
  // PAGE METHODS
  // ====================

  /**
   * Change product color to Blue
   */
  async changeColorToBlue() {
    console.log("Changing color to Blue...");

    // Select Blue option
    await this.click(this.blueColorOption);

    console.log("Color changed to Blue successfully");
  }

  /**
   * Increase quantity to specified amount
   * @param {number} targetQuantity - The desired quantity
   */
  async increaseQuantityTo(targetQuantity) {
    console.log(`Increasing quantity to ${targetQuantity}...`);

    // Get current quantity
    const currentQuantity = parseInt(this.getText(this.quantityDisplay)) || 1;

    // Calculate how many clicks needed
    const clicksNeeded = targetQuantity - currentQuantity;

    // Click increase button required number of times
    for (let i = 0; i < clicksNeeded; i++) {
      await this.click(this.quantityIncreaseButton);
      // Small delay between clicks
      await driver.pause(300);
    }

    // Verify final quantity
    const finalQuantity = parseInt(this.getText(this.quantityDisplay));
    console.log(`Quantity increased to ${finalQuantity}`);

    return finalQuantity;
  }

  /**
   * Add product to cart
   */
  async addToCart() {
    console.log("Adding product to cart...");
    await this.click(this.addToCartButton);
    console.log("Product added to cart");
  }

  /**
   * Verify on cart screen
   * @returns {boolean} True if on cart screen
   */
  async verifyOnCartScreen() {
    try {
      await this.waitForDisplayed(this.cartHeader, 5000);
      return await this.isDisplayed(this.cartHeader);
    } catch (error) {
      console.error("Error verifying cart screen:", error.message);
      return false;
    }
  }

  /**
   * Get cart item details
   * @returns {object} Object containing item details
   */
  async getCartItemDetails() {
    const details = {
      name: this.getText(this.cartItemName),
      quantity: parseInt(this.getText(this.cartItemQuantity)),
      unitPrice: this.getText(this.cartItemUnitPrice),
      totalPrice: this.getText(this.cartItemTotalPrice),
    };

    console.log("Cart Item Details:", details);
    return details;
  }

  /**
   * Calculate expected total price
   * @param {string} unitPrice - Price per unit (with $ sign)
   * @param {number} quantity - Number of items
   * @returns {string} Expected total price formatted
   */
  calculateExpectedTotal(unitPrice, quantity) {
    // Extract numeric value from price string (e.g., "$29.99" -> 29.99)
    const numericPrice = parseFloat(unitPrice.replace(/[^0-9.-]+/g, ""));
    const expectedTotal = numericPrice * quantity;

    // Format back to currency string
    return `$${expectedTotal.toFixed(2)}`;
  }
}

// module.exports = new SecurePage();

export default new SecurePage();
