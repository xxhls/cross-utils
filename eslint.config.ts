import unjs from "eslint-config-unjs";

export default unjs({
  ignores: [
    // ignore paths
    "apps",
  ],
  rules: {
    // rule overrides
    "@typescript-eslint/no-require-imports": "off",
    "@typescript-eslint/no-unused-expressions": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-unsafe-function-type": "off",
    "@typescript-eslint/no-empty-object-type": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-unnecessary-type-constraint": "off",
    "unicorn/no-document-cookie": "off",
    "unicorn/no-null": "off",
    "unicorn/no-empty-file": "off",
    // @ts-ignore
    "no-unsafe-optional-chaining": "off",
    "no-async-promise-executor": "off",
    "no-useless-catch": "off",
    "unicorn/filename-case": "off",
    "no-empty": "off",
    "no-undef": "off",
    "unicorn/no-new-array": "off",
    "unicorn/prefer-spread": "off",
    "unicorn/prefer-number-properties": "off",
    "unicorn/no-array-callback-reference": "off",
    "unicorn/no-this-assignment": "off",
    "unicorn/no-nested-ternary": "off",
    "no-control-regex": "off",
    "no-useless-escape": "off",
    "no-misleading-character-class": "off",
    "no-sparse-arrays": "off",
    "no-fallthrough": "off",
    "unicorn/prefer-code-point": "off",
    "unicorn/prefer-logical-operator-over-ternary": "off",
    "unicorn/prefer-ternary": "off",
    "unicorn/prefer-structured-clone": "off",
    "unicorn/prefer-string-slice": "off",
  },
  markdown: {
    rules: {
      // markdown rule overrides
    },
  },
});
