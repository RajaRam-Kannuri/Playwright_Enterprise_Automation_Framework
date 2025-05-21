// cucumber.js
module.exports = {
  default: {
    // Allows running a single feature using: FEATURE=path/to/file.feature npm run test
    paths: [process.env.FEATURE || "src/web/features/**/*.feature"],

    // Required to support TypeScript
    requireModule: ["ts-node/register"],

    // Location of step definitions and support files
    require: [
      "src/web/step-definitions/**/*.ts",
      "src/web/support/**/*.ts"
    ],

    // Use multiple formatters: Allure + human-readable/CLI
    format: [
      "@cucumber/pretty-formatter",
      "allure-cucumberjs/reporter",
    ],

    // Optional: custom format options
    formatOptions: {
      allure: {
        outputDir: "allure-results"
      }
    },

    // Enable colors in console output
    colorsEnabled: true,

    // Optional: Fail fast on first failure
    // failFast: true,

    // Optional: filter scenarios with tags
    // tags: "@smoke"
  }
};
