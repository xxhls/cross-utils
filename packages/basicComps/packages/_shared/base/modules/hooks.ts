import {
  useDebounce,
  useForceUpdate,
  usePrevious,
  useThrottle,
  useMergeState,
  useProcessActionQueue,
  useMount,
  useUnmount,
  useUpdateEffect,
} from "../../hooks";

// 导出所有hooks
export {
  useDebounce,
  useForceUpdate,
  usePrevious,
  useThrottle,
  useMergeState,
  useProcessActionQueue,
  useMount,
  useUnmount,
  useUpdateEffect,
};

// 导出常用hooks组合
export const hooksUtils = {
  // 状态相关
  state: {
    useMergeState,
    useForceUpdate,
  },

  // 生命周期相关
  lifecycle: {
    useMount,
    useUnmount,
    useUpdateEffect,
  },

  // 性能优化相关
  performance: {
    useDebounce,
    useThrottle,
  },

  // 队列处理相关
  queue: {
    useProcessActionQueue,
  },

  // 值追踪相关
  value: {
    usePrevious,
  },
};
