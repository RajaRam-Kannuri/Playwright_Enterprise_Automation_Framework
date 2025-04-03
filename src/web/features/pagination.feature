Feature: Pagination controls

  Scenario: Go to page 3 on the user list
    Given I am on the "userListPage" page
    When I click page number "3" on pagination of "userListPage"
    