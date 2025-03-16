import { execSync } from "child_process";
import { resolve } from "path";

export async function commitAndTag(rootDir, packagePath, packageName, version) {
  try {
    // 提交更改
    execSync(
      `git add ${packagePath}/CHANGELOG.md ${packagePath}/package.json project.json`,
      {
        stdio: "inherit",
        cwd: rootDir,
      },
    );
    execSync(`git commit -m "chore(release): ${packageName}@${version}"`, {
      stdio: "inherit",
      cwd: rootDir,
    });

    // 创建 tag
    const tagName = `${packageName}@${version}`;
    console.log(`🏷️  创建 tag: ${tagName}`);
    execSync(`git tag -a "${tagName}" -m "Release ${tagName}"`, {
      stdio: "inherit",
      cwd: rootDir,
    });

    // 推送 tag
    console.log(`🚀 推送 tag 到远程`);
    execSync("git push --tags", {
      stdio: "inherit",
      cwd: rootDir,
    });
  } catch (error) {
    console.warn("⚠️ Git 操作失败，请手动执行以下命令：");
    console.warn(
      "需要提交的文件:",
      `\n- ${packagePath}/CHANGELOG.md`,
      `\n- ${packagePath}/package.json`,
      "\n- project.json",
    );
    console.warn(
      "创建 tag:",
      `\ngit tag -a "${packageName}@${version}" -m "Release ${packageName}@${version}"`,
    );
    console.warn("推送 tag:", "\ngit push --tags");
    throw error;
  }
}
