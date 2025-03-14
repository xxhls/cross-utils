import { defineConfig } from "rollup";
import { resolve } from "node:path";
import { fileURLToPath } from 'node:url';
import { readFileSync } from 'node:fs';
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import { dts } from "rollup-plugin-dts";
import clean from "./plugins/plugin-clean.mjs";

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const packages = [
  "basic/cookie",
  "basic/system",
  "basic/platform",
  "basic/login",
  "basic/query",
];

// 读取 package.json 并获取所有依赖
const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {})
];

export default defineConfig([
  ...packages.map((pkg) => {
    const name = pkg.split('/').pop();
    return {
      input: {
        [name]: `${pkg}/index.ts`,
      },
      output: [
        {
          dir: `${pkg.split('/')[0]}/dist`,
          format: 'esm',
        },
      ],
      plugins: [
        clean(),
        alias({
          entries: [
            { find: "@shared", replacement: resolve(__dirname, "shared") },
          ],
        }),
        commonjs(),
        nodeResolve({
          browser: true,
        }),
        json(),
        typescript({
          tsconfig: resolve(__dirname, "tsconfig.json"),
        }),
        babel({
          babelHelpers: "bundled",
          exclude: "node_modules/**",
          presets: ["@babel/preset-env"],
          plugins: ["@babel/plugin-transform-runtime"],
        }),
      ],
      external,
    };
  }),
  ...packages.map((pkg) => {
    const name = pkg.split('/').pop();
    return {
      input: {
        [name]: `${pkg}/index.ts`,
      },
      output: [
        {
          dir: `${pkg.split('/')[0]}/dist`,
          format: 'esm',
          entryFileNames: "[name].d.ts",
        },
      ],
      plugins: [dts()],
      external,
    };
  }),
]);
