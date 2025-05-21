Feature: Validate the Select DropDown


    Background: Login to the application
        Given I am on the "loginPage" page
        When I enter "userName" as "standard_user" on "loginPage"
        When I enter "password" as "secret_sauce" on "loginPage"
        When I click on "signIn" on "loginPage"
        Then I should see "Swag Labs" for "appName" on "homePage"


    Scenario: As a user, I should Validate the Select DropDown

        When I click on "selectDropDown" on "homePage
