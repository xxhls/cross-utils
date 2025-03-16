// 更新版本号
export function updateVersion(version, type) {
  const [major, minor, patch] = version.split(".").map(Number);
  switch (type) {
    case "major":
      return `${major + 1}.0.0`;
    case "minor":
      return `${major}.${minor + 1}.0`;
    case "patch":
      return `${major}.${minor}.${patch + 1}`;
    default:
      return version;
  }
}

// 更新 project.json 中的版本号
export function updateProjectVersion(
  projectConfig,
  packages,
  packageName,
  newVersion,
) {
  // 检查根包
  if (projectConfig.name === packageName) {
    projectConfig.version = newVersion;
    return true;
  }

  for (const pkg of packages) {
    if (pkg.name === packageName) {
      pkg.version = newVersion;
      return true;
    }
    if (
      pkg.packages &&
      updateProjectVersion(projectConfig, pkg.packages, packageName, newVersion)
    ) {
      return true;
    }
  }
  return false;
}
