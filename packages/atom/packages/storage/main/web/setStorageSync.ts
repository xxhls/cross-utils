const setStorageSync = (key: string, data: any) => {
  if (!key) {
    throw new Error(
      'the first param of this Function must contain a property named "key"',
    );
  }
  if (typeof key !== "string") {
    throw new Error(
      'the first param of this Function must contain a property named "key" of string type',
    );
  }
  if (!data) {
    throw new Error(
      'the first param of this Function must contain a property named "data"',
    );
  }
  window.localStorage.setItem(key, JSON.stringify(data));
};

export default setStorageSync;
