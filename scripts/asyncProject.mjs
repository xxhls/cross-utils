import fs from 'fs/promises';
import path from 'path';

async function isPackage(dirPath) {
  try {
    const mainPackagePath = path.join(dirPath, 'main', 'package.json');
    await fs.access(mainPackagePath);
    const packageJson = JSON.parse(await fs.readFile(mainPackagePath, 'utf-8'));
    return packageJson;
  } catch (error) {
    return false;
  }
}

async function scanDirectory(dirPath, basePath = '') {
  const packages = [];
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name === 'node_modules') {
      continue;
    }

    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.join(basePath, entry.name);
    
    const packageInfo = await isPackage(fullPath);
    if (packageInfo) {
      console.log(`🔍 发现包: ${entry.name}`);
      const packageConfig = {
        name: packageInfo.name,
        mainPath: `./${relativePath}/main`,
        version: packageInfo.version
      };

      // 递归扫描子目录中的包
      const subPackages = await scanDirectory(fullPath, relativePath);
      if (subPackages.length > 0) {
        console.log(`📦 在 ${entry.name} 中发现 ${subPackages.length} 个子包`);
        packageConfig.packages = subPackages;
      }

      packages.push(packageConfig);
    } else {
      // 如果当前目录不是包，继续扫描其子目录
      const subPackages = await scanDirectory(fullPath, relativePath);
      packages.push(...subPackages);
    }
  }

  return packages;
}

async function generateProjectJson() {
  try {
    console.log('🚀 开始生成 project.json...');

    // 删除已存在的 project.json
    try {
      await fs.unlink('project.json');
      console.log('🗑️  已删除现有的 project.json');
    } catch (error) {
      // 如果文件不存在，忽略错误
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    // 读取根目录的 main/package.json
    console.log('📖 正在读取根目录配置...');
    const rootPackage = await isPackage('.');
    if (!rootPackage) {
      throw new Error('❌ 根目录中未找到 main/package.json');
    }

    const projectConfig = {
      name: rootPackage.name,
      mainPath: './main',
      version: rootPackage.version
    };

    // 扫描所有子包
    console.log('🔍 开始扫描子包...');
    const packages = await scanDirectory('.');
    if (packages.length > 0) {
      console.log(`📦 总共发现 ${packages.length} 个包`);
      projectConfig.packages = packages;
    }

    // 写入 project.json
    await fs.writeFile(
      'project.json',
      JSON.stringify(projectConfig, null, 2),
      'utf-8'
    );

    console.log('✨ project.json 生成成功！');
  } catch (error) {
    console.error('❌ 生成 project.json 时发生错误:', error);
    process.exit(1);
  }
}

console.log('🎯 正在启动项目配置生成器...');
generateProjectJson();
