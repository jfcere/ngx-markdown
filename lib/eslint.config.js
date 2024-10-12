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
        project: "tsconfig.lib.json",
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
      },
    },

    processor: angular.processInlineTemplates,

    rules: {
      "@angular-eslint/component-selector": ["error", {
        "type": "element",
        "prefix": "markdown",
        "style": "kebab-case",
      }],

      "@angular-eslint/directive-selector": ["error", {
        "type": "attribute",
        "prefix": "markdown",
        "style": "camelCase",
      }],

      "@angular-eslint/no-output-native": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unused-vars":  [ "error", { "args": "none" }],
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/unbound-method": "off",
      "comma-dangle": ["error", "always-multiline"],
      "import/order": "error",
      "object-shorthand": "off",
    },
  },
  {
    files: ["**/*.spec.ts"],

    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: "tsconfig.spec.json",
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
      },
    },

    rules: {
      "@angular-eslint/component-selector": ["error", {
        type: "element",
        prefix: "markdown",
        style: "kebab-case",
      }],

      "@angular-eslint/directive-selector": ["error", {
        type: "attribute",
        prefix: "markdown",
        style: "camelCase",
      }],

      "@angular-eslint/no-output-native": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unsafe-call": "off",

      "@typescript-eslint/no-unused-vars": ["error", {
        args: "none",
      }],

      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/unbound-method": "off",
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
