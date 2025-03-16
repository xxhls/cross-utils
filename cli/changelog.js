import { existsSync, readFileSync, writeFileSync } from "fs";
import { resolve } from "path";
import { execSync } from "child_process";

// 更新 CHANGELOG.md
export async function updateChangelog(
  rootDir,
  packagePath,
  version,
  type,
  changelogMessage,
) {
  const changelogPath = resolve(rootDir, packagePath, "CHANGELOG.md");
  const date = new Date().toISOString().split("T")[0];

  // 获取最近的 git commit 信息
  const getLatestCommits = () => {
    try {
      const commits = execSync('git log -5 --pretty=format:"%s"', {
        cwd: resolve(rootDir, packagePath),
      })
        .toString()
        .split("\n");
      return commits.map((commit) => `- ${commit}`).join("\n");
    } catch (error) {
      return "- No commit messages found";
    }
  };

  const changelogContent = existsSync(changelogPath)
    ? readFileSync(changelogPath, "utf-8")
    : "# Changelog\n";

  const newEntry = `
## v${version} (${date})

### ${type === "major" ? "Breaking Changes" : type === "minor" ? "Features" : "Bug Fixes"}

${getLatestCommits()}

${changelogMessage}
`;

  // 在第一个标题后插入新内容
  const updatedContent = changelogContent.replace(
    /# Changelog\n/,
    `# Changelog\n${newEntry}`,
  );

  writeFileSync(changelogPath, updatedContent);
  console.log(`📝 已更新 CHANGELOG.md`);
}
