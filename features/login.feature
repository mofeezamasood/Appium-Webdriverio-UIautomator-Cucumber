# features/login.feature
Feature: Login Flow

    # Scenario 2: Login Flow (Data Driven)
    Scenario: Attempt login with one locked and one valid credential
        Given I launch the Sauce Labs My Demo App
        When I click on the View menu
        And I click on the "Log In" option in the View menu
        Then I should be on the "Login" screen

        Given I am on the "Login" screen
        And I attempt to login with username "alice@example.com" and password "10203040"
        Then I should see "Sorry this user has been locked out." error message

        Given I am on the "Login" screen
        When I attempt to login with username "bob@example.com" and password "rightpass"
        Then I should be on the "Products" screen