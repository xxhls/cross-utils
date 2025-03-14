const fs = require('fs');
const path = require('path');

// 获取packages下所有路径
const packagesDir = path.join(__dirname, '..', 'packages');
// 遍历packages下的所有目录
const packages = {};
// 遍历packages下的所有目录
const dirs = fs.readdirSync(packagesDir);

dirs.forEach(dir => {
  const packageJsonPath = path.join(packagesDir, dir, 'main', 'package.json');

  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    packages[packageJson.name] = packageJson.version;
  }
});

// 将结果写入到main/subPackage.json
fs.writeFileSync(
  path.join(__dirname, '..', 'main', 'subPackage.json'),
  JSON.stringify(packages, null, 2),
  'utf8'
);

console.log('Successfully generated subPackage.json');
