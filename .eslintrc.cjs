module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript',
    "plugin:prettier/recommended",
    "plugin:import/typescript",
    "plugin:@tanstack/eslint-plugin-query/recommended"
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    'react-refresh',
    "react",
    "@typescript-eslint",
    "prettier",
    "import"
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react/react-in-jsx-scope": ["off"],
    "react/require-default-props": "off",
    "react/jsx-uses-react": ["off"],
    "react/jsx-props-no-spreading": ["error"],
    "react/function-component-definition": [
      2,
      {
        "namedComponents": "arrow-function",
        "unnamedComponents": "arrow-function"
      }
    ],
    "import/no-extraneous-dependencies": [
      "error", {
        "devDependencies": ["**/*.test.tsx", "**/*.test.ts"]
      }
    ],
    "import/prefer-default-export": "off",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module",
    project: ['./tsconfig.json', "./tsconfig.node.json"]
  },
}
