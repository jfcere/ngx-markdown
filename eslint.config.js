// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const importPlugin = require("eslint-plugin-import");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    ignores: ["projects/**/*"],
  },
  {
    files: ["**/*.ts"],

    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],

    plugins: {
      "import": importPlugin,
    },

    settings: {
      "import/resolver": {
        node: true,
        typescript: "eslint-import-resolver-typescript"
      }
    },

    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: __dirname,
        createDefaultProgram: true,
      },
    },

    processor: angular.processInlineTemplates,

    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          "type": "attribute",
          "prefix": "app",
          "style": "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          "type": "element",
          "prefix": "app",
          "style": "kebab-case",
        },
      ],

      "@angular-eslint/no-output-native": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-wrapper-object-types": "off",
      "comma-dangle": ["error", "always-multiline"],

      "comma-spacing": ["error", {
        "before": false,
        "after": true,
      }],

      "import/order": ["error", {
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true,
        },

        "newlines-between": "never",

        "pathGroups": [{
          "pattern": "@*/**",
          "group": "parent",
        }, {
          "pattern": "ngx-markdown",
          "group": "external",
        }],
      }],

      "import/no-duplicates": "error",
      "object-curly-spacing": ["error", "always"],
      "object-shorthand": "off",
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "semi-spacing": "error",

      "sort-imports": ["error", {
        "ignoreCase": true,
        "ignoreDeclarationSort": true,
      }],
    },
  },
  {
    files: ["**/*.html"],

    extends: [
      ...angular.configs.templateRecommended,
    ],

    rules: {},
  }
);
