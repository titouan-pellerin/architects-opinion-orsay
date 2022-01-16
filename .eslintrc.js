module.exports = {
  env: {
    es6: true,
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended"],
  // extends: ["eslint:recommended", "plugin:prettier/recommended"],
  // extends: ["eslint:recommended", "plugin:prettier/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: "module",
  },
  rules: {
    "no-var": "error",
    "no-multi-spaces": "error",
    "prefer-const": "error",
    "no-use-before-define": "error",
    "no-extra-boolean-cast": 0,
    // "no-duplicate-imports": 1,
    indent: ["error", 2, { SwitchCase: 1 }],
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
    "max-len": [
      "error",
      {
        code: 90,
        comments: 150,
        ignorePattern: "^import .*",
      },
    ],
    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "ignore",
      },
    ],
    // "import/order": ["warn", { "newlines-between": "always" }],
  },
};
