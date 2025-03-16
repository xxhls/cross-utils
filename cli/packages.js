// 获取所有包的列表
export function getAllPackages(packages = [], result = []) {
  packages.forEach((pkg) => {
    result.push({
      name: pkg.name,
      version: pkg.version,
      mainPath: pkg.mainPath,
    });
    if (pkg.packages) {
      getAllPackages(pkg.packages, result);
    }
  });
  return result;
}

// 获取所有包，包括根包
export function getPackagesList(projectConfig) {
  return [
    {
      name: projectConfig.name,
      version: projectConfig.version,
      mainPath: projectConfig.mainPath,
    },
    ...getAllPackages(projectConfig.packages),
  ];
}
