import globals from "globals";
import js from "@eslint/js";

/** @type {import('eslint').Linter.Config} */
export default {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  languageOptions: {
    sourceType: "commonjs",
    globals: {
      ...globals.node,  // הוספת תמיכה ב-Node.js
      ...globals.jest,  // הוספת תמיכה ב-Jest
    },
  },
  plugins: [],
  extends: [
    js.configs.recommended,  // הגדרות ברירת מחדל מומלצות
  ],
  rules: {
    "no-unused-vars": "warn",
    "no-undef": "error",
  },
};