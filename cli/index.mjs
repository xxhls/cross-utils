#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { execSync } from "child_process";

import { updateVersion, updateProjectVersion } from "./version.js";
import { getPackagesList } from "./packages.js";
import { updateChangelog } from "./changelog.js";
import { commitAndTag } from "./git.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, "..");

const program = new Command();

// 读取 project.json 文件
const projectConfig = JSON.parse(
  readFileSync(resolve(rootDir, "project.json"), "utf-8"),
);

// 获取所有包列表
const allPackages = getPackagesList(projectConfig);

program
  .name("release")
  .description("选择要发布的包")
  .action(async () => {
    // 先询问搜索关键词
    const { searchTerm } = await inquirer.prompt([
      {
        type: "input",
        name: "searchTerm",
        message: "请输入包名关键词(直接回车显示所有):",
      },
    ]);

    // 过滤包列表
    const filteredPackages = allPackages.filter(
      (pkg) =>
        !searchTerm ||
        pkg.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (filteredPackages.length === 0) {
      console.log("没有找到匹配的包");
      return;
    }

    const { selectedPackage } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedPackage",
        message: "请选择要发布的包:",
        choices: filteredPackages.map((pkg) => ({
          name: `${pkg.name} (${pkg.version})`,
          value: pkg,
        })),
      },
    ]);

    console.log(`\n选择的包: ${selectedPackage.name}`);
    console.log(`版本: ${selectedPackage.version}`);
    console.log(`路径: ${selectedPackage.mainPath}`);

    const { versionType } = await inquirer.prompt([
      {
        type: "list",
        name: "versionType",
        message: "请选择版本更新类型:",
        choices: [
          { name: "patch (补丁版本)", value: "patch" },
          { name: "minor (次要版本)", value: "minor" },
          { name: "major (主要版本)", value: "major" },
        ],
        default: "patch",
      },
    ]);

    const { changelogMessage } = await inquirer.prompt([
      {
        type: "editor",
        name: "changelogMessage",
        message: "请输入更新说明（将被添加到 CHANGELOG.md）:",
        default: "- 请在此处输入更新说明\n- 支持多行\n- 使用 - 作为每行的开头",
      },
    ]);

    const { confirm } = await inquirer.prompt([
      {
        type: "confirm",
        name: "confirm",
        message: "确认要发布这个包吗？",
        default: false,
      },
    ]);

    if (confirm) {
      try {
        console.log("🚀 开始发布...");

        // 读取并更新 package.json 的版本号
        const packageJsonPath = resolve(
          rootDir,
          selectedPackage.mainPath,
          "package.json",
        );
        const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
        const oldVersion = packageJson.version;
        const newVersion = updateVersion(oldVersion, versionType);
        packageJson.version = newVersion;

        console.log(`📝 更新版本号: ${oldVersion} -> ${newVersion}`);
        writeFileSync(
          packageJsonPath,
          JSON.stringify(packageJson, null, 2) + "\n",
        );

        // 更新 CHANGELOG.md
        await updateChangelog(
          rootDir,
          selectedPackage.mainPath,
          newVersion,
          versionType,
          changelogMessage,
        );

        console.log(`📦 正在构建包: ${selectedPackage.name}`);
        execSync("npm run build", {
          stdio: "inherit",
          env: { ...process.env, PACKAGE_NAME: selectedPackage.name },
        });

        console.log(`📝 正在发布包: ${selectedPackage.name}@${newVersion}`);
        execSync("npm publish --access public", {
          stdio: "inherit",
          cwd: resolve(rootDir, selectedPackage.mainPath),
        });

        // 更新 project.json 中的版本号
        if (
          updateProjectVersion(
            projectConfig,
            projectConfig.packages,
            selectedPackage.name,
            newVersion,
          )
        ) {
          console.log(
            `📝 更新 project.json 中的版本号: ${selectedPackage.name}@${newVersion}`,
          );
          writeFileSync(
            resolve(rootDir, "project.json"),
            JSON.stringify(projectConfig, null, 2) + "\n",
          );
        } else {
          console.warn(`⚠️ 在 project.json 中未找到包 ${selectedPackage.name}`);
        }

        // 提交更改并创建 tag
        await commitAndTag(
          rootDir,
          selectedPackage.mainPath,
          selectedPackage.name,
          newVersion,
        );

        console.log(`✅ 包发布成功: ${selectedPackage.name}@${newVersion}`);
      } catch (error) {
        console.error("❌ 发布失败:", error.message);
        process.exit(1);
      }
    } else {
      console.log("已取消发布");
    }
  });

program.parse();
