module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "react-app",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime"
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "simple-import-sort"],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "object-curly-spacing": [1, "always"],
    "no-multi-spaces": ["error"],
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
        argsIgnorePattern: "^_"
      }
    ],

    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "@typescript-eslint/no-non-null-assertion": 0,
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "off",
  }
};
