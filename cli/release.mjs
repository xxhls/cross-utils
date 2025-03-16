#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const program = new Command();

// 读取 project.json 文件
const projectConfig = JSON.parse(
  readFileSync(resolve(__dirname, '../project.json'), 'utf-8')
);

// 获取所有包的列表
function getAllPackages(packages = [], result = []) {
  packages.forEach(pkg => {
    result.push({
      name: pkg.name,
      version: pkg.version,
      mainPath: pkg.mainPath
    });
    if (pkg.packages) {
      getAllPackages(pkg.packages, result);
    }
  });
  return result;
}

// 更新版本号
function updateVersion(version, type) {
  const [major, minor, patch] = version.split('.').map(Number);
  switch (type) {
    case 'major':
      return `${major + 1}.0.0`;
    case 'minor':
      return `${major}.${minor + 1}.0`;
    case 'patch':
      return `${major}.${minor}.${patch + 1}`;
    default:
      return version;
  }
}

// 更新 project.json 中的版本号
function updateProjectVersion(packages, packageName, newVersion) {
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
    if (pkg.packages && updateProjectVersion(pkg.packages, packageName, newVersion)) {
      return true;
    }
  }
  return false;
}

// 获取所有包，包括根包
const allPackages = [
  {
    name: projectConfig.name,
    version: projectConfig.version,
    mainPath: projectConfig.mainPath
  },
  ...getAllPackages(projectConfig.packages)
];

program
  .name('release')
  .description('选择要发布的包')
  .action(async () => {
    // 先询问搜索关键词
    const { searchTerm } = await inquirer.prompt([
      {
        type: 'input',
        name: 'searchTerm',
        message: '请输入包名关键词(直接回车显示所有):',
      }
    ]);

    // 过滤包列表
    const filteredPackages = allPackages.filter(pkg => 
      !searchTerm || pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredPackages.length === 0) {
      console.log('没有找到匹配的包');
      return;
    }

    const { selectedPackage } = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedPackage',
        message: '请选择要发布的包:',
        choices: filteredPackages.map(pkg => ({
          name: `${pkg.name} (${pkg.version})`,
          value: pkg
        }))
      }
    ]);

    console.log(`\n选择的包: ${selectedPackage.name}`);
    console.log(`版本: ${selectedPackage.version}`);
    console.log(`路径: ${selectedPackage.mainPath}`);

    const { versionType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'versionType',
        message: '请选择版本更新类型:',
        choices: [
          { name: 'patch (补丁版本)', value: 'patch' },
          { name: 'minor (次要版本)', value: 'minor' },
          { name: 'major (主要版本)', value: 'major' }
        ],
        default: 'patch'
      }
    ]);
    
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: '确认要发布这个包吗？',
        default: false
      }
    ]);

    if (confirm) {
      try {
        console.log('🚀 开始发布...');
        
        // 读取并更新 package.json 的版本号
        const packageJsonPath = resolve(__dirname, `../${selectedPackage.mainPath}/package.json`);
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
        const oldVersion = packageJson.version;
        const newVersion = updateVersion(oldVersion, versionType);
        packageJson.version = newVersion;

        console.log(`📝 更新版本号: ${oldVersion} -> ${newVersion}`);
        writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

        console.log(`📦 正在构建包: ${selectedPackage.name}`);
        execSync('npm run build', {
          stdio: 'inherit',
          env: { ...process.env, PACKAGE_NAME: selectedPackage.name }
        });

        console.log(`📝 正在发布包: ${selectedPackage.name}@${newVersion}`);
        execSync('npm publish --access public', {
          stdio: 'inherit',
          cwd: resolve(__dirname, `../${selectedPackage.mainPath}`)
        });

        // 更新 project.json 中的版本号
        if (updateProjectVersion(projectConfig.packages, selectedPackage.name, newVersion)) {
          console.log(`📝 更新 project.json 中的版本号: ${selectedPackage.name}@${newVersion}`);
          writeFileSync(
            resolve(__dirname, '../project.json'),
            JSON.stringify(projectConfig, null, 2) + '\n'
          );
        } else {
          console.warn(`⚠️ 在 project.json 中未找到包 ${selectedPackage.name}`);
        }

        console.log(`✅ 包发布成功: ${selectedPackage.name}@${newVersion}`);
      } catch (error) {
        console.error('❌ 发布失败:', error.message);
        process.exit(1);
      }
    } else {
      console.log('已取消发布');
    }
  });

program.parse();
