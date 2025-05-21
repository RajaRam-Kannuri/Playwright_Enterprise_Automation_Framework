Feature: Validate the Inventory List


    # Background: Login to the application
    #     Given I am on the "loginPage" page
    #     When I enter "userName" as "standard_user" on "loginPage"
    #     When I enter "password" as "secret_sauce" on "loginPage"
    #     When I click on "signIn" on "loginPage"
        


    Scenario: As a user, I should Validate the Inventory List
        Given I am logged in
        Then I should see "Swag Labs" for "appName" on "homePage"
        Then the list "inventoryList" on "homePage" should contain:
            | Sauce Labs Backpack               |
            | Sauce Labs Bike Light             |
            | Sauce Labs Bolt T-Shirt           |
            | Sauce Labs Fleece Jacket          |
            | Sauce Labs Onesie                 |
            | Test.allTheThings() T-Shirt (Red) |
