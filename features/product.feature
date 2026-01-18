# features/product.feature
Feature: Product Selection & Cart Validation

  # Scenario 1: Product Selection & Cart Validation
  Scenario: Add two blue backpacks to cart and verify cart details
    Given I launch the Sauce Labs My Demo App
    Then I should be on the "Products" screen

    Given I am on the "Products" screen
    When I click on the "Sauce Labs Backpack" product
    Then I should be on the "Sauce Labs Backpack" screen 

    Given I am on the "Sauce Labs Backpack" screen
    When I change the color to "Blue"
    And I increase the quantity to "2"
    And I click on the "Add to cart" button
    Then I should see that the cart number was updated to "2" in the cart icon
    And I navigate to the "My Cart" screen

    Given I am on the "Cart" screen
    Then I verify the item name in cart is "Sauce Labs Backpack" 
    And I verify the quantity of the item in the cart is "2"
    And I verify the total price matches the calculation for "2" items
