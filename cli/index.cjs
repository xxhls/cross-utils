#!/usr/bin/env node
const { Command } = require("commander");
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");
const program = new Command();

// 获取packages下的所有一级目录
function getPackages() {
  const packagesDir = path.join(__dirname, "../packages");
  return fs.readdirSync(packagesDir)
    .filter(file => {
      // 过滤掉以下划线开头的内部目录和非目录文件
      const fullPath = path.join(packagesDir, file);
      return !file.startsWith('_') && fs.statSync(fullPath).isDirectory();
    })
    .map(dir => ({
      name: dir,
      value: dir
    }));
}

// 获取指定包下的子包
function getSubPackages(packageName) {
  const packagesDir = path.join(__dirname, `../packages/${packageName}/packages`);
  if (!fs.existsSync(packagesDir)) {
    return [];
  }
  return fs.readdirSync(packagesDir)
    .filter(file => {
      const fullPath = path.join(packagesDir, file);
      return fs.statSync(fullPath).isDirectory();
    })
    .map(dir => ({
      name: `${packageName}-${dir}`,
      value: `${dir}`
    }));
}

// 执行 npm 命令的函数
function runNpmCommand(command) {
  return new Promise((resolve, reject) => {
    const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const child = spawn(npmCmd, ['run', command], {
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`命令执行失败，退出码: ${code}`));
        return;
      }
      resolve();
    });
  });
}

// 执行 npm publish 命令的函数
function runNpmPublish(packagePath) {
  return new Promise((resolve, reject) => {
    const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    const child = spawn(npmCmd, ['publish', '--access', 'public'], {
      stdio: 'inherit',
      shell: true,
      cwd: packagePath
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`发布失败，退出码: ${code}`));
        return;
      }
      resolve();
    });
  });
}

// 获取包的实际路径和 package.json 路径
function getPackagePaths(packageType, subPackage = null) {
  let targetPath;
  let packageJsonPath;
  let packageName;
  let buildCommand;

  if (packageType === 'main') {
    targetPath = path.join(__dirname, '../main');
    packageJsonPath = targetPath;
    packageName = 'main';
    buildCommand = 'build:main';
  } else if (packageType === 'atoms' || packageType === 'basic') {
    // atoms 和 basic 的特殊处理
    targetPath = path.join(__dirname, `../packages/${packageType}`);
    packageJsonPath = path.join(__dirname, '../main');
    packageName = packageType;
    buildCommand = `build:${packageType}`;

    if (subPackage) {
      targetPath = path.join(targetPath, 'packages', subPackage);
      packageName = `${packageType}-${subPackage}`;
      buildCommand = `build:${packageType}:pkg ${subPackage}`;
    }
  } else {
    // 其他包的常规处理
    targetPath = path.join(__dirname, `../packages/${packageType}`);
    packageJsonPath = targetPath;
    packageName = packageType;
    buildCommand = `build:${packageType}`;

    if (subPackage) {
      targetPath = path.join(targetPath, 'packages', subPackage);
      packageJsonPath = targetPath;
      packageName = `${packageType}-${subPackage}`;
      buildCommand = `build:${packageType}:pkg ${subPackage}`;
    }
  }

  return {
    targetPath,
    packageJsonPath,
    packageName,
    buildCommand
  };
}

// 更新 package.json 中的版本号
function updateVersion(packagePath, type, preId) {
  const packageJsonPath = path.join(packagePath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const currentVersion = packageJson.version;

  const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  let versionArgs = ['version'];

  if (type === 'prerelease' && preId) {
    versionArgs.push(type, `--preid=${preId}`);
  } else {
    versionArgs.push(type);
  }

  return new Promise((resolve, reject) => {
    const child = spawn(npmCmd, versionArgs, {
      stdio: 'inherit',
      shell: true,
      cwd: path.dirname(packageJsonPath)
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`版本号更新失败，退出码: ${code}`));
        return;
      }
      // 重新读取更新后的版本号
      const updatedPackageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      resolve({
        oldVersion: currentVersion,
        newVersion: updatedPackageJson.version
      });
    });
  });
}

// 创建 Git Tag
function createGitTag(version, packageName) {
  return new Promise((resolve, reject) => {
    const tagName = `${packageName}@${version}`;
    const child = spawn('git', ['tag', tagName], {
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Git tag 创建失败，退出码: ${code}`));
        return;
      }
      resolve(tagName);
    });
  });
}

// 推送 Git Tag
function pushGitTag(tagName) {
  return new Promise((resolve, reject) => {
    const child = spawn('git', ['push', 'origin', tagName], {
      stdio: 'inherit',
      shell: true
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Git tag 推送失败，退出码: ${code}`));
        return;
      }
      resolve();
    });
  });
}

program
  .version("0.0.1")
  .description("A CLI tool for building cross-platform packages");

program
  .command("build")
  .description("Build the cross-platform packages")
  .action(async () => {
    const packages = [
      { name: "构建整个 main", value: "main" },
      new inquirer.Separator('─────────────────'),
      ...getPackages()
    ];

    if (packages.length === 0) {
      console.log("没有找到可构建的包！");
      return;
    }

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "packageType",
        message: "请选择要构建的包类型：",
        choices: packages
      }
    ]);

    console.log(`开始构建 ${answers.packageType} 包...`);
    try {
      if (answers.packageType === 'main') {
        await runNpmCommand('build:main');
      } else {
        // 获取子包列表
        const subPackages = getSubPackages(answers.packageType);

        // 添加构建整个包的选项
        const packageChoices = [
          { name: `构建整个 ${answers.packageType}`, value: answers.packageType },
          new inquirer.Separator('─────────────────'),
          ...subPackages
        ];

        const packageAnswer = await inquirer.prompt([
          {
            type: "list",
            name: "subPackage",
            message: `请选择要构建的 ${answers.packageType} 包：`,
            choices: packageChoices
          }
        ]);

        if (packageAnswer.subPackage === answers.packageType) {
          await runNpmCommand(`build:${answers.packageType}`);
        } else {
          await runNpmCommand(`build:${answers.packageType}:pkg ${packageAnswer.subPackage}`);
        }
      }
    } catch (error) {
      console.error('构建失败：', error.message);
      process.exit(1);
    }
  });

program
  .command("release")
  .description("Release and publish packages to npm")
  .action(async () => {
    const packages = [
      { name: "发布整个 main", value: "main" },
      new inquirer.Separator('─────────────────'),
      ...getPackages()
    ];

    if (packages.length === 0) {
      console.log("没有找到可发布的包！");
      return;
    }

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "packageType",
        message: "请选择要发布的包类型：",
        choices: packages
      },
      {
        type: "list",
        name: "versionType",
        message: "请选择版本更新类型：",
        choices: [
          { name: "补丁版本 (patch)", value: "patch" },
          { name: "次要版本 (minor)", value: "minor" },
          { name: "主要版本 (major)", value: "major" },
          { name: "Alpha 预发布版本", value: "alpha" },
          { name: "Beta 预发布版本", value: "beta" }
        ]
      }
    ]);

    try {
      let paths;

      if (answers.packageType === 'main') {
        paths = getPackagePaths('main');
      } else {
        // 获取子包列表
        const subPackages = getSubPackages(answers.packageType);

        // 添加发布整个包的选项
        const packageChoices = [
          { name: `发布整个 ${answers.packageType}`, value: answers.packageType },
          new inquirer.Separator('─────────────────'),
          ...subPackages
        ];

        const packageAnswer = await inquirer.prompt([
          {
            type: "list",
            name: "subPackage",
            message: `请选择要发布的 ${answers.packageType} 包：`,
            choices: packageChoices
          }
        ]);

        paths = getPackagePaths(
          answers.packageType,
          packageAnswer.subPackage === answers.packageType ? null : packageAnswer.subPackage
        );
      }

      // 更新版本号
      const versionType = answers.versionType;
      let versionUpdateType;
      let preId;

      if (versionType === 'alpha' || versionType === 'beta') {
        versionUpdateType = 'prerelease';
        preId = versionType;
      } else {
        versionUpdateType = versionType;
      }

      console.log(`正在更新 ${paths.packageName} 的版本号...`);
      const versionInfo = await updateVersion(paths.packageJsonPath, versionUpdateType, preId);
      console.log(`版本号已从 ${versionInfo.oldVersion} 更新到 ${versionInfo.newVersion}`);

      // 构建包
      console.log(`正在构建 ${paths.packageName} 包...`);
      await runNpmCommand(paths.buildCommand);
      console.log('构建成功！');

      // 创建并推送 tag
      console.log('正在创建 Git Tag...');
      const tagName = await createGitTag(versionInfo.newVersion, paths.packageName);
      console.log(`Git Tag ${tagName} 创建成功！`);

      console.log('正在推送 Git Tag...');
      await pushGitTag(tagName);
      console.log('Git Tag 推送成功！');

      // 发布包
      console.log(`正在发布 ${paths.packageName} 包...`);
      await runNpmPublish(paths.targetPath);
      console.log('发布成功！');
    } catch (error) {
      console.error('操作失败：', error.message);
      process.exit(1);
    }
  });

program.parse(process.argv);
