import globals from "globals";

export default [
  {
    files: ["./src/**/*.ts"]
  },
  {
    languageOptions: { globals: globals.browser }
  },
];