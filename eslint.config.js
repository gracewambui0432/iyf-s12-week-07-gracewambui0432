import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly",
        document: "readonly",
        localStorage: "readonly",
        window: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
    },
  },
  {
    ignores: ["node_modules/**", "dist/**"],
  },
];
