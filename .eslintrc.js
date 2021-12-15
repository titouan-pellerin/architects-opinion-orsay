module.exports = {
  env: {
    es6: true,
    browser: true,
    es2021: true,
  },
  // extends: ["eslint:recommended", "plugin:prettier/recommended"],
  extends: ["eslint:recommended"],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  rules: {
    "no-duplicate-imports": 1,
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    // "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    semi: ["error", "always"],
    "no-unused-vars": [
      "warn",
      {
        args: "after-used",
        ignoreRestSiblings: false,
        argsIgnorePattern: "^_.*?$",
      },
    ],
    // 'import/order': ['warn', { 'newlines-between': 'always' }],
  },
};
