import { CONTAINER_NAME } from '@atom-shared/constant';

export const styleOut = (output: any, originalInput: any, originalOutput: any) => {
  return {
    ...output,
    _original: {
      input: { ...originalInput }, // 实际调用 api 方法时传入的参数. 对入参进行 format 之后的结果
      output: { ...originalOutput }, // 实际调用 api 方法时传入的参数. 返回值 format 之前的结果
    },
  };
};

export const styleIn = (options: any, baseName: string) => {
  const { _ext = {}, ...rest } = options || {};
  return {
    ...rest,
    ...(_ext[baseName] || {}),
  };
};

// 处理类似于getStorageSync这种，微信与支付宝有参数差异
export const aliIn = (options: string, baseName: string) => {
  if (baseName === CONTAINER_NAME.ALIPAY) {
    return {
      key: options
    }
  }
  return options
}