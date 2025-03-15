import { execSync } from "node:child_process";
import { resolve } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

import findMainPath from "./findMainPath.mjs";
import updateVersion from "./updateVersion.mjs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// 读取项目配置
const projectJson = JSON.parse(
  readFileSync(resolve(__dirname, "../project.json"), "utf-8"),
);

// 更新 project.json 中的版本号
function updateProjectVersion(packages, packageName, newVersion) {
  for (const pkg of packages) {
    if (pkg.name === packageName) {
      pkg.version = newVersion;
      return true;
    }
    if (
      pkg.packages &&
      updateProjectVersion(pkg.packages, packageName, newVersion)
    ) {
      return true;
    }
  }
  return false;
}

function release() {
  try {
    const packageName = process.env.PACKAGE_NAME;
    const versionType = process.env.VERSION_TYPE || "patch";

    if (!packageName) {
      throw new Error("需要设置 PACKAGE_NAME 环境变量");
    }

    console.log(`🚀 开始发布包: ${packageName}`);

    if (!["patch", "minor", "major"].includes(versionType)) {
      throw new Error("VERSION_TYPE 必须是以下值之一: patch, minor, major");
    }

    const mainPath = findMainPath(projectJson, packageName);
    if (!mainPath) {
      throw new Error(`未找到包 ${packageName} 的主路径`);
    }

    // 读取并更新 package.json 的版本号
    const packageJsonPath = resolve(__dirname, `../${mainPath}/package.json`);
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
    const oldVersion = packageJson.version;
    const newVersion = updateVersion(oldVersion, versionType);
    packageJson.version = newVersion;

    console.log(`📝 更新版本号: ${oldVersion} -> ${newVersion}`);
    writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + "\n");

    console.log(`📦 正在构建包: ${packageName}`);
    execSync("npm run build", {
      stdio: "inherit",
      env: { ...process.env, PACKAGE_NAME: packageName },
    });

    console.log(`📝 正在发布包: ${packageName}@${newVersion}`);
    execSync("npm publish --access public", {
      stdio: "inherit",
      cwd: resolve(__dirname, `../${mainPath}`),
    });

    // 更新 project.json 中的版本号
    if (updateProjectVersion(projectJson.packages, packageName, newVersion)) {
      console.log(
        `📝 更新 project.json 中的版本号: ${packageName}@${newVersion}`,
      );
      writeFileSync(
        resolve(__dirname, "../project.json"),
        JSON.stringify(projectJson, null, 2) + "\n",
      );
    } else {
      console.warn(`⚠️ 在 project.json 中未找到包 ${packageName}`);
    }

    console.log(`✅ 包发布成功: ${packageName}@${newVersion}`);
  } catch (error) {
    console.error("❌ 发布失败:", error.message);
    process.exit(1);
  }
}

release();
