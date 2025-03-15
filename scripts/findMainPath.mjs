/**
 * 递归查找目标包的 mainPath
 * @param {import('project.json')} root 
 * @param {string} targetName 
 * @returns {string | null}
 */
function findMainPath(root, targetName) {
    // 检查当前层级
    if (root.name === targetName) {
        return root.mainPath
    }

    // 检查 packages 数组
    if (root.packages) {
        for (const pkg of root.packages) {
            if (pkg.name === targetName) {
                return pkg.mainPath
            }
            if (pkg.packages) {
                const found = findMainPath(pkg, targetName)
                if (found) return found
            }
        }
    }
    return null
}

export default findMainPath
