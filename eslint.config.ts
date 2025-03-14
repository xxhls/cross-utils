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
    "unicorn/no-document-cookie": "off",
    "unicorn/no-null": "off",
    "unicorn/no-empty-file": "off",
    // @ts-ignore
    "no-unsafe-optional-chaining": "off",
    "no-async-promise-executor": "off",
  },
  markdown: {
    rules: {
      // markdown rule overrides
    },
  },
});
