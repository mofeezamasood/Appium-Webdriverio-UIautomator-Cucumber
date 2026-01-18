import { $ } from "@wdio/globals";
import { default as Page } from "./page.js";

// Products Page Object Model
// Contains all selectors and methods for the Products screen
class ProductsPage extends Page {
  // ====================
  // SELECTORS
  // ====================

  // Product list items - using accessibility ID which is more reliable
  get productItems() {
    return $(
      '//android.widget.FrameLayout[@content-desc="Container for fragments"]/android.view.ViewGroup',
    );
  }

  // Sauce Labs Backpack product - find by product name
  get sauceLabsBackpack() {
    // Using XPath to find element by text (common in mobile apps)
    return $('(//android.widget.ImageView[@content-desc="Product Image"])[1]');
  }

  // Header title to verify we're on Products screen
  get productsHeader() {
    return $('//android.widget.TextView[@content-desc="title"]');
  }

  // /**
  //  * Cart icon to navigate to cart
  //  */
  // get cartIcon() {
  //   return $(
  //     '//android.widget.ImageView[@content-desc="Displays number of items in your cart"]',
  //   );
  // }

  // // ====================
  // // PAGE METHODS
  // // ====================

  // Verify we're on the Products screen
  //   * @returns {boolean} True if on Products screen
  async verifyOnProductsScreen() {
    try {
      // Wait for products header to be displayed
      await this.waitForDisplayed(this.productsHeader);
      return await this.isDisplayed(this.productsHeader);
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

  // /**
  //  * Navigate to cart
  //  */
  // async navigateToCart() {
  //   console.log("Navigating to cart...");
  //   await this.click(this.cartIcon);
  //   console.log("Navigation to cart complete");
  // }

  // /**
  //  * Get cart badge count
  //  * @returns {number} The number of items in cart
  //  */
  // async getCartItemCount() {
  //   try {
  //     const cartBadge = await $(
  //       '//android.widget.ImageView[@content-desc="Displays number of items in your cart"]',
  //     );
  //     if (await this.isDisplayed(cartBadge)) {
  //       const badgeText = await this.getText(cartBadge);
  //       return parseInt(badgeText);
  //     }
  //     return 0;
  //   } catch (error) {
  //     return 0;
  //   }
  // }
}

export default new ProductsPage();
