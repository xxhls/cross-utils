import { p2Arry, makeCancelable, CPromise } from '../../promise';

export {
  p2Arry,
  makeCancelable,
  CPromise
};

// 导出常用方法
export const promiseUtils = {
  toArray: p2Arry,
  makeCancelable,
  CPromise
}; 