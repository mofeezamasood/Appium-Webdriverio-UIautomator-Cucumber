import { browser } from "@wdio/globals";

export class Page {
  // Hamburger menu button
  get viewMenu() {
    return driver.$("accessibility id:View menu");
  }

  async clickViewMenu() {
    await this.viewMenu.click();
  }

  async clickMenuItem(menuItem) {
    await menuItem.click();
  }
}

export default Page;
