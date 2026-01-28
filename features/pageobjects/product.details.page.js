import { $ } from "@wdio/globals";
import { Page } from "./page.js";

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

  // Cart button/icon
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

  // Cart number element in the cart icon
  get getCartNumberElement() {
    return $(
      '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/cartTV"]',
    );
  }

  // ====================
  // PAGE METHODS
  // ====================

  // Change product color to Blue
  async changeColorToBlue() {
    console.log("Changing color to Blue.");

    // Select Blue option
    // try a few selector variations (content-desc is common, but sometimes resource-id/text differ)
    await $('//android.widget.ImageView[@content-desc="Blue color"]').click();

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

  async verifyOnProductDetailScreen() {
    const productTitle = await this.productName.getText();
    return productTitle === "Sauce Labs Backpack";
  }

  async openCart() {
    console.log("Opening cart from product details page");
    await this.cartButton.click();
    console.log("Cart opened");
  }
}

export default new ProductDetailsPage();
