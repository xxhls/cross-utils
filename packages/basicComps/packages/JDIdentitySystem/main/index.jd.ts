/**
 * 获取设备指纹信息
 * @returns
 */
export const getEid = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    const st = setTimeout(() => {
      resolve("");
    }, 5000);
    jd.getEid({
      success(res) {
        clearTimeout(st);
        resolve(res.eid);
      },
      fail(e) {
        clearTimeout(st);
        reject("");
      },
      complete(e) {
        clearTimeout(st);
      },
    });
  });
};
// // 设备指纹
// export const eidParams = () => {
//     const tk = Taro.getStorageSync("_we_tk") || Taro.getStorageSync("tk");
//     return tk
//   };
//  getCartUuid: UuidInfo?.cartUUId,
const UuidInfo = jd.getUUIdSync();
export const getUUID = () => {
  return new Promise((resolve, reject) => {
    resolve(UuidInfo?.deviceUUId);
  });
};
