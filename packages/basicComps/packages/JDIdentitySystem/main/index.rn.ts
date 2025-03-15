import System from "../system/index.rn";

/**
 * 获取设备指纹信息
 * @returns
 */
export const getEid = (): Promise<any> => {
  return new Promise((resolve, reject) => {});
};

export const getUUID = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    System.getDeviceId().then(
      (returned_deviceId) => {
        resolve(returned_deviceId);
      },
      () => {
        reject();
      },
    );
  });
};
