const fs = require('fs');
const path = require('path');

// 获取命令行参数
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('请指定要处理的目录名称，例如: node generateSubPackage.cjs atoms basic main');
  process.exit(1);
}

function findPackageJsonFiles(dir) {
  const results = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      results.push(...findPackageJsonFiles(filePath));
    } else if (file === 'package.json') {
      results.push(filePath);
    }
  }

  return results;
}

function generateSubPackageForDir(packagesDir, targetDir) {
  const packagesPath = path.join(packagesDir, targetDir, 'packages');

  if (!fs.existsSync(packagesPath)) {
    console.error(`目录不存在: ${packagesPath}`);
    return;
  }

  const packageJsonFiles = findPackageJsonFiles(packagesPath);
  const subPackages = {};

  packageJsonFiles.forEach(filePath => {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    if (content.name && content.version) {
      subPackages[content.name] = content.version;
    }
  });

  const subPackagePath = path.join(packagesDir, targetDir, 'main/subPackage.json');
  fs.writeFileSync(subPackagePath, JSON.stringify(subPackages, null, 2));
  console.log(`Generated subPackage.json in ${targetDir}/main`);
}

function generateMainSubPackage(packagesDir, dirs) {
  const mainSubPackages = {};

  dirs.forEach(dir => {
    const mainPackageJson = path.join(packagesDir, dir, 'main/package.json');
    if (fs.existsSync(mainPackageJson)) {
      const content = JSON.parse(fs.readFileSync(mainPackageJson, 'utf-8'));
      if (content.name && content.version) {
        mainSubPackages[content.name] = content.version;
      }
    }
  });

  // 创建main目录（如果不存在）
  const mainDir = path.join(packagesDir, '../main');
  if (!fs.existsSync(mainDir)) {
    fs.mkdirSync(mainDir, { recursive: true });
  }

  const mainSubPackagePath = path.join(mainDir, 'subPackage.json');
  fs.writeFileSync(mainSubPackagePath, JSON.stringify(mainSubPackages, null, 2));
  console.log('Generated main subPackage.json');
}

function generateSubPackage() {
  const packagesDir = path.join(__dirname, '../packages');
  const dirsToProcess = args.filter(dir => dir !== 'main');

  // 处理普通目录
  dirsToProcess.forEach(dir => {
    console.log(`Processing directory: ${dir}`);
    generateSubPackageForDir(packagesDir, dir);
  });

  // 只有当参数中包含 'main' 时才生成最外层的 subPackage.json
  if (args.includes('main')) {
    console.log('Processing main subPackage.json');
    generateMainSubPackage(packagesDir, dirsToProcess);
  }
}

generateSubPackage();
