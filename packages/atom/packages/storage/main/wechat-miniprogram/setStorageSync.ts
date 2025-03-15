const setStorageSync = (key: string, data: any) => {
  return wx.setStorageSync(key, data);
};

export default setStorageSync;
