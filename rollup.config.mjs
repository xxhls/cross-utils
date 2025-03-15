import { defineConfig } from 'rollup'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from "node:url";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import babel from "@rollup/plugin-babel";
import { dts } from "rollup-plugin-dts";

import findMainPath from './scripts/findMainPath.mjs'

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectJson = JSON.parse(readFileSync(resolve(__dirname, './project.json'), 'utf-8'));
const packageJson = JSON.parse(readFileSync(resolve(__dirname, './package.json'), 'utf-8'));
const external = Object.keys(packageJson.dependencies || {})

const packageName = process.env.PACKAGE_NAME || "@test/cross-utils"
const mainPath = findMainPath(projectJson, packageName)

if (!mainPath) {
    throw new Error(`Main path not found for package ${packageName}`)
}

function resolveEntry(basePath) {
    const tsEntry = resolve(__dirname, `${basePath}/index.ts`)
    const tsxEntry = resolve(__dirname, `${basePath}/index.tsx`)
    
    if (existsSync(tsEntry)) {
        return `${basePath}/index.ts`
    }
    
    if (existsSync(tsxEntry)) {
        return `${basePath}/index.tsx`
    }
    
    throw new Error(`Neither index.ts nor index.tsx found in ${basePath}`)
}

export default defineConfig([
    {
        input:  resolveEntry(mainPath),
        output: {
            dir: resolve(__dirname, `${mainPath}/dist`),
            format: 'esm',
            entryFileNames: 'index.js',
        },
        plugins: [
            commonjs({
                transformMixedEsModules: true,
                requireReturnsDefault: "auto",
                include: /node_modules/,
            }),
                nodeResolve({
                browser: true,
            }),
            json(),
            typescript({
                tsconfig: resolve(__dirname, "tsconfig.json"),
            }),
            babel({
                babelHelpers: "runtime",
                exclude: "node_modules/**",
                presets: ["@babel/preset-env"],
                plugins: ["@babel/plugin-transform-runtime"],
            }),
        ],
        external
    },
    {
        input:  resolveEntry(mainPath),
        output: {
            dir: resolve(__dirname, `${mainPath}/dist`),
            format: 'esm',
            entryFileNames: 'index.d.ts',
        },
        plugins: [dts()],
        external
    },
])
