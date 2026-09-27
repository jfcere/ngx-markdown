// @ts-check
import eslint from "@eslint/js";
import angular from "angular-eslint";
import perfectionist from "eslint-plugin-perfectionist";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

const tsconfigRootDir = import.meta.dirname;

// Replaces `import/order` from eslint-plugin-import, whose latest release
// (2.32.0) still caps its eslint peer at `^9` and so blocked eslint 10.
// `eslint-plugin-perfectionist` supports `^10` and covers the same ground.
//
// This reproduces the previous ordering: a single alphabetical run of
// non-relative imports, then relative ones, ascending and case-insensitive,
// with no blank line between groups (`newlinesBetween: 0`).
/**
 * `tsconfig-path` only resolves aliases when the rule is told where to find the
 * tsconfig, and lib and demo each have their own root, so callers pass theirs.
 *
 * @param {string} rootDir
 * @returns {import("eslint").Linter.RuleEntry}
 */
export const sortImportsRule = rootDir => ["error", {
  tsconfig: { rootDir },
  type: "alphabetical",
  order: "asc",
  ignoreCase: true,
  newlinesBetween: 0,
  customGroups: [
    // `ngx-markdown` is a tsconfig alias here (the demo consumes the library
    // through `./lib/src`), but committed order treats it as the package it
    // will be once published: ahead of the app's own `@app`/`@shared` aliases.
    { groupName: "ngx-markdown", elementNamePattern: "^ngx-markdown$" },
  ],
  groups: [
    // One flat alphabetical run for real packages. The previous `import/order`
    // config nominally mapped `@*/**` to `parent`, but alphabetisation already
    // placed scoped packages first (`@` sorts before letters), so `@angular/*`
    // and `ngx-markdown` were never separate groups in practice.
    ["builtin", "external", "internal", "subpath", "ngx-markdown"],
    // The demo's `@app/*` and `@shared/*` tsconfig aliases are a real group
    // though: committed order puts them after `ngx-markdown`, not before it,
    // which plain alphabetisation would never produce. `lib` has no aliases,
    // so this entry is inert there.
    "tsconfig-path",
    ["parent", "sibling", "index"],
    "unknown",
  ],
}];

export default defineConfig(
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
      perfectionist,
    },

    languageOptions: {
      ecmaVersion: 5,
      sourceType: "script",

      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir,
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

      "perfectionist/sort-imports": sortImportsRule(tsconfigRootDir),

      // `no-duplicate-imports` is the built-in equivalent of
      // `import/no-duplicates`.
      "no-duplicate-imports": "error",
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
