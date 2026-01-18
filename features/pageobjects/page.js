import { browser } from "@wdio/globals";

/**
 * main page object containing all methods, selectors and functionality
 * that is shared across all page objects
 */
export default class Page {
  /**
   * Wait for an element to be displayed
   * @param {WebdriverIO.Element} element - The element to wait for
   * @param {number} timeout - Timeout in milliseconds (default: 10000)
   */
  async waitForDisplayed(element, timeout = 10000) {
    await element.waitForDisplayed({ timeout });
  }

  /**
   * Wait for an element to be clickable
   * @param {WebdriverIO.Element} element - The element to wait for
   * @param {number} timeout - Timeout in milliseconds (default: 10000)
   */
  async waitForClickable(element, timeout = 10000) {
    try {
      if (typeof element.waitForClickable === "function") {
        await element.waitForClickable({ timeout });
        return;
      }
      await this.waitForDisplayed(element, timeout);
    } catch (error) {
      // Fallback to displayed check for native/mobile contexts
      await this.waitForDisplayed(element, timeout);
    }
  }

  /**
   * Click on an element with retry logic
   * @param {WebdriverIO.Element} element - The element to click
   */
  async click(element) {
    await this.waitForClickable(element);
    await element.click();
  }

  /**
   * Set text in an input field
   * @param {WebdriverIO.Element} element - The input element
   * @param {string} text - The text to enter
   */
  async setText(element, text) {
    await this.waitForDisplayed(element);
    await element.setValue(text);
  }

  /**
   * Get text from an element
   * @param {WebdriverIO.Element} element - The element to get text from
   * @returns {string} The element's text
   */

  /**
   * Check if element is displayed
   * @param {WebdriverIO.Element} element - The element to check
   * @returns {boolean} True if element is displayed
   */
  async isDisplayed(element) {
    try {
      return await element.isDisplayed();
    } catch (error) {
      return false;
    }
  }
}
