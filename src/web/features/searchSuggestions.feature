Feature: Search auto-suggestions


  Scenario Outline:  Validate and interact with dynamic suggestions
    Given I am on the "searchPage" page
    When I type "Cucumber" in "searchInput" on "searchPage" and select suggestion "Cucumber JS"
    Then I should see 5 suggestions on "searchPage"
    And a suggestion containing "Cucu" is shown on "searchPage"
    And a suggestion exactly matching "Cucumber JS" is shown on "searchPage"
    And all suggestions contain "Cucumber" on "searchPage"

    Examples:
        | searchInput | suggestion |
        | Cucumber    | Cucumber JS |
        | Cucumber    | Cucumber    |
        | Cucumber    | Cucu       |
        | Cucumber    | Cucu JS    |
        | Cucumber    | Cucu J     |
        | Cucumber    | Cuc        |
        | Cucumber    | Cu         |
        | Cucumber    | C          |
        | Cucumber    |            |