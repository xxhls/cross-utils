import unjs from "eslint-config-unjs";

export default unjs({
  ignores: [
    // ignore paths
    "apps",
  ],
  rules: {
    // rule overrides
    "unicorn/no-document-cookie": "off",
    "unicorn/no-null": "off",
    "unicorn/no-empty-file": "off",
    // @ts-ignore
    "no-unsafe-optional-chaining": "off",
  },
  markdown: {
    rules: {
      // markdown rule overrides
    },
  },
});
