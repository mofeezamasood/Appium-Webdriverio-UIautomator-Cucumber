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
    await element.waitForClickable({ timeout });
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
  async getText(element) {
    await this.waitForDisplayed(element);
    return await element.getText();
  }

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

  /**
   * Scroll to an element (mobile friendly)
   * @param {WebdriverIO.Element} element - The element to scroll to
   */
  async scrollToElement(element) {
    // Mobile scroll action
    const elementLocation = await element.getLocation();
    const elementSize = await element.getSize();

    const x = elementLocation.x + elementSize.width / 2;
    const y = elementLocation.y + elementSize.height / 2;

    // Simple scroll using touch action
    await driver.touchAction([
      { action: "press", x: x, y: y + 200 },
      { action: "moveTo", x: x, y: y },
      "release",
    ]);
  }
}

module.exports = Page;
