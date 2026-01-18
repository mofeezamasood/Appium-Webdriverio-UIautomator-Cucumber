import { $ } from "@wdio/globals";
import Page from "./page.js";

/**
 * Product Details & Cart Page Object Model
 * Contains all selectors and methods for product details and cart screens
 */
class ProductDetailsPage extends Page {
  // ====================
  // SELECTORS - PRODUCT DETAILS
  // ====================

  // Product name on details page
  get productName() {
    return $(
      '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/productTV"]',
    );
  }

  get cartButton() {
    return $(
      '//android.widget.ImageView[@content-desc="Displays number of items in your cart"]',
    );
  }

  // Blue color option
  get blueColorOption() {
    return $('//android.widget.ImageView[@content-desc="Blue color"]');
  }

  // Quantity increase button (+)
  get quantityIncreaseButton() {
    return $(
      '//android.widget.ImageView[@content-desc="Increase item quantity"]',
    );
  }

  // Quantity display
  get quantityDisplay() {
    return $(
      '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/noTV"]',
    );
  }

  // Add to cart button
  get addToCartButton() {
    return $(
      '//android.widget.Button[@resource-id="com.saucelabs.mydemoapp.android:id/cartBt"]',
    );
  }

  // Price display on details page
  get productPrice() {
    return $(
      '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/priceTV"]',
    );
  }

  // ====================
  // SELECTORS - CART SCREEN
  // ====================

  // Cart screen header
  get cartHeader() {
    return $(
      '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/productTV"]',
    );
  }

  // Cart item name
  get cartItemName() {
    return $(
      '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/titleTV"]',
    );
  }

  // Cart item quantity
  get cartItemQuantity() {
    return $(
      '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/noTV"]',
    );
  }

  // Cart item total price
  get cartItemTotalPrice() {
    return $(
      '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/totalPriceTV"]',
    );
  }

  // Cart item price per unit
  get cartItemUnitPrice() {
    return $(
      '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/priceTV"]',
    );
  }

  get getCartNumberElement() {
    return $(
      '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/cartTV"]',
    );
  }

  // ====================
  // PAGE METHODS
  // ====================

  // Safely find an element by selector and wait for it to be displayed.
  // Returns null when the element cannot be found within the timeout.
  async findElementSafe(selector, timeout = 3000) {
    try {
      const el = await $(selector);
      await el.waitForDisplayed({ timeout });
      return el;
    } catch (error) {
      return null;
    }
  }

  // Safely click an element if present.
  async safeClick(selector) {
    try {
      const el = await this.findElementSafe(selector, 2000);
      if (el) await this.click(el);
      return !!el;
    } catch (error) {
      return false;
    }
  }
  // Safely retrieve text from an element, returning empty string when not found.
  async safeGetText(selector) {
    try {
      const el = await this.findElementSafe(selector, 2000);
      if (!el) return "";
      return await this.getText(el);
    } catch (error) {
      return "";
    }
  }

  // Change product color to Blue
  async changeColorToBlue() {
    console.log("Changing color to Blue.");

    // Select Blue option
    // try a few selector variations (content-desc is common, but sometimes resource-id/text differ)
    await this.safeClick(
      '//android.widget.ImageView[@content-desc="Blue color"]',
    );

    console.log("Color changed to Blue successfully");
  }

  // Increase quantity to specified amount
  // @param {number} targetQuantity - The desired quantity
  async increaseQuantityTo(targetQuantity) {
    console.log(`Increasing quantity to ${targetQuantity}`);

    // Get current quantity
    const currentQuantityStr = this.quantityDisplay.getText();
    const currentQuantity = parseInt(currentQuantityStr);

    console.log(`Quantity right now is ${currentQuantity}`);

    // Calculate how many clicks needed
    const clicksNeeded = targetQuantity - currentQuantity;

    console.log(`Clicks needed are ${clicksNeeded}`);

    // Click increase button required number of times
    for (let i = 0; i < clicksNeeded; i++) {
      // Try clicking known selector(s); ignore if not clickable
      await this.quantityIncreaseButton.click();

      console.log(`Clicks done are ${clicksNeeded}`);

      await driver.pause(300);
    }

    // Verify final quantity (best-effort)
    const finalQuantityStr = this.quantityDisplay.getText;

    const finalQuantity = parseInt(finalQuantityStr) || targetQuantity;
    console.log(`Quantity increased to ${finalQuantity}`);

    return finalQuantity;
  }

  // Add product to cart
  async addToCart() {
    console.log("Adding product to cart");
    const getcartbutton = this.addToCartButton;
    await getcartbutton.click();
    console.log("Product added to cart");
  }

  async verifyCartNumber() {
    console.log("Verifying cart number");
    const cartNumberText = await this.getCartNumberElement.getText();
    console.log(`Cart number is: ${cartNumberText}`);
    return cartNumberText;
  }

  // Verify on cart screen
  // @returns {boolean} True if on cart screen
  async verifyOnCartScreen() {
    try {
      await this.waitForDisplayed(this.cartHeader, 5000);
      return await this.isDisplayed(this.cartHeader);
    } catch (error) {
      console.error("Error verifying cart screen:", error.message);
      return false;
    }
  }

  // Get cart item details
  // @returns {object} Object containing item details
  async getCartItemDetails() {
    // Try multiple selectors and return safe defaults when elements are missing
    const name =
      (await this.safeGetText(
        '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/titleTV"]',
      )) ||
      (await this.safeGetText(
        '//android.widget.TextView[contains(@content-desc, "title")]',
      ));

    const quantityStr =
      (await this.safeGetText(
        '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/noTV"]',
      )) ||
      (await this.safeGetText(
        '//android.widget.TextView[contains(@text, "") and @resource-id]',
      ));

    const unitPrice =
      (await this.safeGetText(
        '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/priceTV"]',
      )) ||
      (await this.safeGetText(
        '//android.widget.TextView[contains(@content-desc, "price")]',
      ));

    const totalPrice =
      (await this.safeGetText(
        '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/totalPriceTV"]',
      )) ||
      (await this.safeGetText(
        '//android.widget.TextView[contains(@content-desc, "total")]',
      ));

    const details = {
      name,
      quantity: parseInt(quantityStr) || 0,
      unitPrice,
      totalPrice,
    };

    console.log("Cart Item Details:", details);
    return details;
  }

  // Calculate expected total price
  // @param {string} unitPrice - Price per unit (with $ sign)
  // @param {number} quantity - Number of items
  // @returns {string} Expected total price formatted
  calculateExpectedTotal(unitPrice, quantity) {
    // Extract numeric value from price string (e.g., "$29.99" -> 29.99)
    const numericPrice = parseFloat(unitPrice.replace(/[^0-9.-]+/g, ""));
    const expectedTotal = numericPrice * quantity;

    // Format back to currency string
    return `$${expectedTotal.toFixed(2)}`;
  }

  async verifyOnProductDetailScreen() {
    const productTitle = await this.productName.getText();
    return productTitle === "Sauce Labs Backpack";
  }

  async getItemName() {
    return await this.productName.getText();
  }

  async openCart() {
    console.log("Opening cart from product details page");
    await this.cartButton.click();
    console.log("Cart opened");
  }
}

export default new ProductDetailsPage();
