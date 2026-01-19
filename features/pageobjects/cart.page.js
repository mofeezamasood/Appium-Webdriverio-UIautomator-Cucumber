import { default as Page } from "./page.js";

class CartPage extends Page {
  get cartHeader() {
    return $(
      '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/productTV"]',
    );
  }

  get itemQuantity() {
    return $(
      '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/cartTV"]',
    );
  }

  get itemName() {
    return $(
      '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/titleTV"]',
    );
  }

  get individualItemPrice() {
    return $(
      '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/priceTV"]',
    );
  }

  get totalItemPrice() {
    return $(
      '//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/totalPriceTV"]',
    );
  }

  async verifyTotal(quantity) {
    try {
      const unitPriceText = await this.individualItemPrice.getText();
      const totalPriceText = await this.totalItemPrice.getText();

      // Extract numeric values from text (assuming format like "$29.99")
      const unitPrice = parseFloat(unitPriceText.replace("$", ""));
      const expectedTotal = unitPrice * quantity;
      const actualTotal = parseFloat(totalPriceText.replace("$", ""));

      console.log(
        `Verifying total price: Expected = $${expectedTotal.toFixed(
          2,
        )}, Actual = $${actualTotal.toFixed(2)}`,
      );
      return actualTotal.toFixed(2) === expectedTotal.toFixed(2);
    } catch (error) {
      console.error("Error verifying total price:", error.message);
      return false;
    }
  }

  async getItemName() {
    try {
      const nameText = await this.itemName.getText();
      console.log(`Item name in cart: ${nameText}`);
      return nameText;
    } catch (error) {
      console.error("Error getting item name in cart:", error.message);
      return null;
    }
  }

  async verifyOnCartScreen() {
    try {
      // Wait for cart header to be displayed
      return (await this.cartHeader.getText()) === "My Cart";
    } catch (error) {
      console.error("Error verifying cart screen:", error.message);
      return false;
    }
  }

  async itemQuantityInCart() {
    try {
      const quantityText = await this.itemQuantity.getText();
      console.log(`Item quantity in cart: ${quantityText}`);
      return quantityText;
    } catch (error) {
      console.error("Error getting item quantity in cart:", error.message);
      return null;
    }
  }
}

export default new CartPage();
