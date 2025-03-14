import { defineConfig } from "rollup";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync, readdirSync } from "node:fs";
import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import { dts } from "rollup-plugin-dts";
import clean from "./plugins/plugin-clean.mjs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// 读取 packages 目录下非_开头文件夹中的所有文件夹
const packages = readdirSync(resolve(__dirname, "packages"), { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith('_'))
  .flatMap(category => {
    const categoryPath = resolve(__dirname, "packages", category.name);
    return readdirSync(categoryPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory() && dirent.name !== 'dist')
      .map(dirent => `packages/${category.name}/${dirent.name}`);
  });

// 读取 package.json 并获取所有依赖
const pkg = JSON.parse(readFileSync("./package.json", "utf8"));
const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];

export default defineConfig([
  ...packages.map((pkg) => {
    const name = pkg.split("/").pop();
    return {
      input: {
        [name]: `${pkg}/index.ts`,
      },
      output: [
        {
          dir: `output/${pkg.split("/")[0]}`,
          format: "esm",
        },
        {
          dir: `output/${pkg.split("/")[1]}`,
          format: "esm",
        },
        {
          dir: `output/${pkg.split("/")[2]}`,
          format: "esm",
        },
      ],
      plugins: [
        clean(),
        alias({
          entries: [
            { find: "@shared", replacement: resolve(__dirname, "./packages/_shared") },
          ],
        }),
        commonjs({
          transformMixedEsModules: true,
          requireReturnsDefault: 'auto',
          include: /node_modules/
        }),
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
    const name = pkg.split("/").pop();
    return {
      input: {
        [name]: `${pkg}/index.ts`,
      },
      output: [
        {
          dir: `output/${pkg.split("/")[0]}`,
          format: "esm",
          entryFileNames: "[name].d.ts",
        },
        {
          dir: `output/${pkg.split("/")[1]}`,
          format: "esm",
          entryFileNames: "[name].d.ts",
        },
        {
          dir: `output/${pkg.split("/")[2]}`,
          format: "esm",
          entryFileNames: "[name].d.ts",
        },
      ],
      plugins: [dts()],
      external,
    };
  }),
]);
