// ====================
// THEN Steps (Verifications)
// ====================

// I should see that the cart number was updated on the cart icon
Then(
  "I should see that the cart number was updated on the cart icon",
  async () => {
    console.log("Verifying item was added to cart");

    // Check for cart badge or confirmation message
    const itemIsAdded = productDetail.verifyCartNumber();
    expect(itemIsAdded).to.be.true;

    console.log("✓ Item addition to cart verified");
  },
);

// Verify we're on the Products screen
Then("I should be on the {string} screen", async (screenName) => {
  console.log(`Verifying we're on the "${screenName}" screen`);

  if (screenName === "Products") {
    const isOnProductsScreen = await mainPage.verifyOnProductsScreen();
    expect(isOnProductsScreen).to.be.true;
    console.log("Successfully verified Products screen");
  }
});
