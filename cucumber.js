module.exports = {
  default: {
    paths: ["src/web/features/**/*.feature"],
    requireModule: ["ts-node/register"],
    require: [
      "src/web/step-definitions/**/*.ts",
      "src/web/support/**/*.ts"
    ],
    format: [
      "@cucumber/pretty-formatter",
      "allure-cucumberjs/reporter",
      // "progress"
    ]
  }
};
