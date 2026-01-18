# # features/login.feature
# Feature: Login Flow

#     # Scenario 2: Login Flow (Data Driven)
#     Scenario: Attempt login with two invalid and one valid credentials
#         Given I launch the Sauce Labs My Demo App
#         When I am on the "Login" screen
#         And I attempt to login with username "invalid user1" and password "wrong pass1"
#         Then I should see "Locked Out User" error message

#         Given I am on the "Login" screen
#         When I attempt to login with username "invalid user2" and password "wrong pass2"
#         Then I should see "Invalid password" error message

#         Given I am on the "Login" screen
#         When I attempt to login with username "invalid user3" and password "wrong pass3"
#         Then I should be successfully logged in and see the products screen