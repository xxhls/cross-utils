/** @format */

import System from ".";

type versionReturn = -1 | 0 | 1;

/**
 * 【当前客户端版本和目标版本对比，jdapp专用】
 * @param {string} targetVersion 目标版本号 example：'1.2.3'
 * @returns { returnType }
 * -1：当前客户端版本小于目标版本；0：当前客户端版本等于目标版本；1：当前客户端版本大于目标版本；
 */
const compareVersions = (
  targetVersion: string,
  hostVersion?: string,
): versionReturn => {
  if (!targetVersion) {
    throw new Error("compareVersions: Expected 1 arguments, but got 0.");
  }

  // 切成数组
  try {
    hostVersion = hostVersion || System.hostVersionName();
  } catch (e) {
    // hostVersion = hostVersion;
  }

  const _hostVersionArr = hostVersion?.split(".");
  const hostVersionArr = _hostVersionArr;
  const targetVersionArr = targetVersion.split(".");
  let length = Math.max(hostVersionArr.length, targetVersionArr.length);

  while (length > 0) {
    let v1;
    let v2;
    try {
      v1 = Number(hostVersionArr.shift());
      v2 = Number(targetVersionArr.shift());
    } catch (e) {
      v1 = 0;
      v2 = 0;
    }

    if (v1 > v2) {
      return 1;
    }
    if (v1 < v2) {
      return -1;
    }
    length -= 1;
  }

  return 0;
};

export default compareVersions;
