// eslint-disable-next-line no-undef
module.exports = {
  env: {
    es2021: true,
    "react-native/react-native": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-native/all",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "react-native", "@typescript-eslint", "prettier"],
  rules: {
    "react-native/no-color-literals": "off",
    "react/prop-types": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "error", // Optional, depending on your strictness
    "no-restricted-syntax": [
      "error",
      {
        selector: 'CallExpression[callee.object.name="console"][callee.property.name="log"]',
        message: "Unexpected console.log statement.",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_", // Ignore unused arguments that start with an underscore
      },
    ],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
