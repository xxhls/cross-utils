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

program.parse(process.argv);
