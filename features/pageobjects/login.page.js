import { Page } from "./page.js";
import { $ } from "@wdio/globals";

class LoginPage extends Page {
  // Username input field
  get usernameInput() {
    return driver.$("id:com.saucelabs.mydemoapp.android:id/nameET");
  }

  // Password input field
  get passwordInput() {
    return driver.$("id:com.saucelabs.mydemoapp.android:id/passwordET");
  }

  // Login button
  get loginButton() {
    return driver.$("accessibility id:Tap to login with given credentials");
  }

  // Login screen title
  get loginScreenTitle() {
    return driver.$("id:com.saucelabs.mydemoapp.android:id/loginTV");
  }

  // Error message element
  get errorMessage() {
    return driver.$("id:com.saucelabs.mydemoapp.android:id/passwordErrorTV");
  }

  // Login menu item in hamburger menu
  get loginMenuItem() {
    return driver.$("accessibility id:Login Menu Item");
  }

  async login(username, password) {
    await this.usernameInput.setValue(username);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  async verifyOnLoginScreen() {
    const verifyOnLoginScreenText = await this.loginScreenTitle.getText();
    console.log(`On Login screen with title: ${verifyOnLoginScreenText}`);
    return verifyOnLoginScreenText;
  }

  async getErrorMessageText() {
    const errorMessageRecieved = await this.errorMessage.getText();
    return errorMessageRecieved;
  }

  async clickMenuItem() {
    await super.clickMenuItem(this.loginMenuItem);
  }
}

export default new LoginPage();
