import { $ } from "@wdio/globals";
import { default as Page } from "./page.js";

/**
 * Products Page Object Model
 * Contains all selectors and methods for the Products screen
 */
class ProductsPage extends Page {
  // ====================
  // SELECTORS
  // ====================

  /**
   * Product list items - using accessibility ID which is more reliable
   */
  get productItems() {
    return $(
      '//android.widget.FrameLayout[@content-desc="Container for fragments"]/android.view.ViewGroup',
    );
  }

  /**
   * Sauce Labs Backpack product - find by product name
   */
  get sauceLabsBackpack() {
    // Using XPath to find element by text (common in mobile apps)
    return $(
      '//android.widget.TextView[@content-desc="Product Title" and @text="Sauce Labs Backpack"]',
    );
  }

  /**
   * Header title to verify we're on Products screen
   */
  get productsHeader() {
    return $('//android.widget.TextView[@content-desc="title"]');
  }

  /**
   * Cart icon to navigate to cart
   */
  get cartIcon() {
    return $(
      '//android.widget.ImageView[@content-desc="Displays number of items in your cart"]',
    );
  }

  // ====================
  // PAGE METHODS
  // ====================

  /**
   * Verify we're on the Products screen
   * @returns {boolean} True if on Products screen
   */
  async verifyOnProductsScreen() {
    try {
      // Wait for products to load
      await this.waitForDisplayed(this.productItems[0]);
      return await this.isDisplayed(this.productsHeader);
    } catch (error) {
      console.error("Error verifying Products screen:", error.message);
      return false;
    }
  }

  /**
   * Select Sauce Labs Backpack product
   */
  async selectSauceLabsBackpack() {
    console.log("Selecting Sauce Labs Backpack...");

    // Scroll to the product if needed
    await this.scrollToElement(this.sauceLabsBackpack);

    // Click on the product
    await this.click(this.sauceLabsBackpack);

    console.log("Sauce Labs Backpack selected successfully");
  }

  /**
   * Navigate to cart
   */
  async navigateToCart() {
    console.log("Navigating to cart...");
    await this.click(this.cartIcon);
    console.log("Navigation to cart complete");
  }

  /**
   * Get cart badge count
   * @returns {number} The number of items in cart
   */
  async getCartItemCount() {
    try {
      const cartBadge = await $(
        '//android.widget.ImageView[@content-desc="Displays number of items in your cart"]',
      );
      if (this.isDisplayed(cartBadge)) {
        const badgeText = this.getText(cartBadge);
        return parseInt(badgeText);
      }
      return 0;
    } catch (error) {
      return 0;
    }
  }
}

module.exports = new ProductsPage();
