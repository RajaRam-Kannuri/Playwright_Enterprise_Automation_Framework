Feature: Multi-level navigation using menu and sub-menu

  Scenario: Navigate to a settings page via hamburger menu
    Given I am on the "dashboardPage" page
    When I open "hamburgerMenu" then click on "settingsOption" on "dashboardPage"
