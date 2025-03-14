import { defineConfig } from "rollup";
import { resolve } from "node:path";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import { dts } from "rollup-plugin-dts";
import clean from "./plugins/plugin-clean.mjs";

export default defineConfig([
  {
    input: {
      cookie: "basic/cookie/index.ts",
    },
    output: [
      {
        dir: "basic/dist",
        format: "esm",
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
    external: ["@tarojs/taro"],
  },
  {
    input: {
      cookie: "basic/cookie/index.ts",
    },
    output: [
      {
        dir: "basic/dist",
        format: "esm",
        entryFileNames: "[name].d.ts",
      },
    ],
    plugins: [dts()],
    external: ["@tarojs/taro"],
  },
]);
