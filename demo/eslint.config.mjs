// @ts-check
import { join } from "node:path";
import angular from "angular-eslint";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import baseConfig, { sortImportsRule } from "../eslint.config.mjs";

// The repo has a single `tsconfig.json`, at the root, and it is the one that
// declares the `@app/*`, `@shared/*` and `ngx-markdown` path aliases.
const repoRoot = join(import.meta.dirname, "..");

export default defineConfig(
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
        tsconfigRootDir: import.meta.dirname,
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
      "perfectionist/sort-imports": sortImportsRule(repoRoot),
      "object-shorthand": "off",
    },
  },
  {
    files: ["**/*.html"],
    rules: {},
  },
);
