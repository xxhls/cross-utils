/**
 * 更新版本号
 * @param {string} version 当前版本号
 * @param {'patch' | 'minor' | 'major'} type 更新类型
 * @returns {string} 新版本号
 */
function updateVersion(version, type = "patch") {
  const [major, minor, patch] = version
    .replace(/[^\d.]/g, "")
    .split(".")
    .map(Number);

  switch (type) {
    case "major":
      return `${major + 1}.0.0`;
    case "minor":
      return `${major}.${minor + 1}.0`;
    case "patch":
    default:
      return `${major}.${minor}.${patch + 1}`;
  }
}

export default updateVersion;
