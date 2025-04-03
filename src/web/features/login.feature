  Feature: Login Feature

    Scenario Outline: As a user, I can log into the Saudce Demo with  <username>

      Given I am on the "loginPage" page
      When I enter "userName" as "<username>" on "loginPage"
      When I enter "password" as "<password>" on "loginPage"
      When I click on "signIn" on "loginPage"
      Then I should see "<text>" for "<textLocator>" on "<pageName>"
      ##When I select "United States" from "CountryDropdown" on "RegistrationPage"
      Examples:
        | username        | password     | text                                                | pageName       | textLocator     |
        | standard_user   | secret_sauce | SwaLabs                                             | homePage       | appName         |
        | locked_out_user | secret_sauce | Epic sadface: Sorry, this user has been locked out. | loginErrorPage | locked_out_user |