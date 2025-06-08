import eslint from "@eslint/js"
import importPlugin from "eslint-plugin-import"
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import globals from "globals"
import tseslint from "typescript-eslint"

export default tseslint.config(
  { ignores: ["dist", "node_modules", "temp"] },
  {
    extends: [
      eslint.configs.recommended,
      importPlugin.flatConfigs.recommended,
      importPlugin.flatConfigs.typescript,
      ...tseslint.configs.recommended,
      ...tseslint.configs.strict,
      ...tseslint.configs.stylistic,
    ],
    files: ["**/*.{js,jsx,mjs,cjs,ts,tsx,cts,mts}"],
    languageOptions: {
      ecmaVersion: "latest",
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "no-unused-vars": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      // Allow to use underscore for unused variables to avoid the warnings.
      // Useful for function arguments which are unused but cannot be removed (e.g. method overrides)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_", // Ignore unused function arguments starting with "_"
          varsIgnorePattern: "^_", // Ignore unused variables starting with "_"
          caughtErrorsIgnorePattern: "^_", // Ignore unused caught errors starting with "_"
        },
      ],
      // Prefer 'type' over 'interface'
      "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
        },
      ],
      "import/no-cycle": ["error", { maxDepth: Infinity }],
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal"],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-named-as-default-member": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  },
  eslintPluginPrettierRecommended,
)
