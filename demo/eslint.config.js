// @ts-check
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

const baseConfig = require("../eslint.config.js");

module.exports = tseslint.config(
  {
    extends: [...baseConfig],
  },
  {
    ignores: ["!**/*"],
  },
  {
    files: ["**/*.ts"],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: "tsconfig.app.json",
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
      },
    },

    processor: angular.processInlineTemplates,

    rules: {
      "@angular-eslint/component-selector": ["error", {
        "type": "element",
        "prefix": "app",
        "style": "kebab-case",
      }],

      "@angular-eslint/directive-selector": ["error", {
        "type": "attribute",
        "prefix": "app",
        "style": "camelCase",
      }],

      "@angular-eslint/no-output-native": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-var-requires": "off",
      "comma-dangle": ["error", "always-multiline"],
      "import/order": "error",
      "object-shorthand": "off",
    },
  },
  {
    files: ["**/*.html"],
    rules: {},
  },
);
