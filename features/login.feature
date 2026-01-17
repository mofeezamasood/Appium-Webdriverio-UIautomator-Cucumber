# features/login.feature
Feature: Sauce Labs My Demo App - Product Selection & Cart Validation

  # Scenario 1: Product Selection & Cart Validation
  Scenario: Add two blue backpacks to cart and verify cart details
    Given I launch the Sauce Labs My Demo App
    Then I should be on the "Products" screen
    
    When I select the "Sauce Labs Backpack" product
    And I change the color to "Blue"
    And I increase the quantity to "2"
    And I click "Add to Cart"
    
    When I navigate to the Cart
    Then I verify the item name is "Sauce Labs Backpack"
    And I verify the quantity is "2"
    And I verify the total price matches the calculation for 2 items