import { useState, useEffect, useRef, useCallback } from 'react';
import type { DependencyList } from "react";
import { CPromise } from "./promise";

/**
 * 防抖 Hook
 * @template T 值的类型
 * @param value 需要防抖的值
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的值
 * 
 * @example
 * const debouncedValue = useDebounce(searchTerm, 500);
 */
const useDebounceInternal = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

/**
 * 强制更新 Hook
 * @returns 强制更新函数
 * 
 * @example
 * const forceUpdate = useForceUpdate();
 * // 需要强制更新组件时调用
 * forceUpdate();
 */
const useForceUpdateInternal = (): () => void => {
  const [, setState] = useState({});
  return useCallback(() => setState({}), []);
};

/**
 * 获取上一个值的 Hook
 * @template T 值的类型
 * @param value 当前值
 * @returns 上一个值
 * 
 * @example
 * const prevCount = usePrevious(count);
 */
const usePreviousInternal = <T>(value: T): T | undefined => {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

/**
 * 节流 Hook
 * @template T 值的类型
 * @param value 需要节流的值
 * @param limit 节流时间间隔（毫秒）
 * @returns 节流后的值
 * 
 * @example
 * const throttledValue = useThrottle(scrollPosition, 100);
 */
const useThrottleInternal = <T>(value: T, limit: number): T => {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));

    return () => clearTimeout(handler);
  }, [value, limit]);

  return throttledValue;
};

/**
 * 合并对象形式的 state 的自定义 hook
 * @template T 状态对象的类型
 * @param initialState 初始状态值或返回初始状态的函数
 * @returns [当前状态, 更新状态的函数]
 * 
 * @example
 * const [state, setState] = useMergeState({ name: '', age: 0 });
 * setState({ name: 'John' }); // 只更新 name，保留其他属性
 */
const useMergeStateInternal = <T extends Record<string, any>>(initialState?: T | (() => T)) => {
  const [state, setState] = useState<any>(initialState);
  const refResolve = useRef<any>();

  const setMergedState = (newState?: Partial<T> | ((prevState: T) => Partial<T>)) => {
    if (typeof newState === 'function') {
      setState(newState);
    } else {
      setState((prevState?: T) => Object.assign({}, prevState, newState));
    }
    const p = new CPromise((resolve) => {
      refResolve.current = resolve;
    });
    return p;
  };

  useEffect(() => {
    const st = setTimeout(() => {
      refResolve.current?.();
    }, 20);
    return () => {
      clearTimeout(st);
    };
  }, [state]);

  return [state, setMergedState] as [T, (newState?: Partial<T> | ((prevState: T) => Partial<T>)) => CPromise<never>];
};

/**
 * 处理动作队列的自定义 Hook
 * 用于按顺序处理异步任务，确保任务按照添加顺序依次执行
 * 
 * @param callBack 处理每个队列项的回调函数
 * @returns 包含队列控制方法的对象
 * 
 * @example
 * const { processActionQueue } = useProcessActionQueue(async (args) => {
 *   await processItem(args);
 * });
 * 
 * // 添加任务到队列
 * await processActionQueue(itemData);
 */
const useProcessActionQueueInternal = <T = any>(
  callBack: (args: T, options?: Record<string, any>) => Promise<any>
) => {
  // 是否正在处理任务的标志
  const isProcessing = useRef(false);
  // 存储待处理任务参数的队列
  const refArgs = useRef<Array<{
    args: T;
    [key: string]: any;
  }>>([]);
  // 当前队列状态的 Promise
  const refQueueStatus = useRef<Promise<any>>();

  /**
   * 内部处理队列的函数
   * 递归处理队列中的所有任务
   */
  const _processActionQueue = useCallback(async () => {
    if (refArgs.current.length > 0 && !isProcessing.current) {
      isProcessing.current = true;
      const { args, ...others } = refArgs.current.shift()!;
      try {
        await callBack(args, others);
      } catch (error) {
        // console.error('processActionQueue error', error);
      }
      isProcessing.current = false;
      await _processActionQueue();
    }
  }, [callBack]);

  /**
   * 添加任务到队列并开始处理
   * @param args 任务参数
   * @param option 配置选项
   * @param option.reProcess 是否重置队列并重新开始处理
   * @returns Promise 当前队列处理的Promise
   * 
   * @example
   * // 普通添加任务
   * await processActionQueue(data);
   * 
   * // 重置队列并添加新任务
   * await processActionQueue(data, { reProcess: true });
   */
  const processActionQueue = useCallback(async (
    args: T,
    option?: { reProcess: boolean } & Record<string, any>
  ) => {
    if (option?.reProcess) {
      refArgs.current = [];
      isProcessing.current = false;
    }
    refArgs.current.push({ args, ...(option || {}) });
    refQueueStatus.current = _processActionQueue();
    await refQueueStatus.current;
  }, [_processActionQueue]);

  // 组件卸载时清空队列
  useEffect(() => {
    return () => {
      refArgs.current = [];
    };
  }, []);

  return {
    /** 添加任务到队列并处理 */
    processActionQueue,
    /** 获取当前队列中的所有任务参数 */
    getArgsQueue: () => refArgs.current,
    /** 获取当前队列的处理状态 */
    getQueuePendingStatus: () => refQueueStatus.current
  };
};

// 统一导出
export const useDebounce = useDebounceInternal;
export const useForceUpdate = useForceUpdateInternal;
export const usePrevious = usePreviousInternal;
export const useThrottle = useThrottleInternal;
export const useMergeState = useMergeStateInternal;
export const useProcessActionQueue = useProcessActionQueueInternal;

export type { CPromise };

/**
 * 组件挂载时执行
 */
export const useMount = (fn: () => void) => {
  useEffect(() => {
    fn?.();
  }, []);
};

/**
 * 组件卸载时执行
 */
export const useUnmount = (fn: () => void) => {
  const ref = useRef(fn);
  ref.current = fn;

  useEffect(() => () => {
    ref.current?.();
  }, []);
};

/**
 * 组件更新时执行
 */
export const useUpdateEffect = (fn: () => void, deps: any[]) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    } else {
      fn?.();
    }
  }, deps);
};

/**
 * 深度比较两个对象是否相等。
 *
 * @param a 任意类型的对象。
 * @param b 任意类型的对象。
 * @param ignoreKeys 可选，要忽略的键名数组。
 * @param debug 可选，是否开启调试模式，开启时会打印不相等的键名。
 * @returns 如果两个对象深度相等返回true，否则返回false。
 */
function isDeepEqualReact(
  a: any,
  b: any,
  ignoreKeys?: string[],
  debug?: boolean,
) {
  // 如果两个值相等（包括类型相同），则返回true
  if (a === b) return true;

  // 如果a和b都是对象，并且不为null
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    // 如果构造函数不同，则两个对象不相等
    if (a.constructor !== b.constructor) return false;

    let length; // 用于存储长度
    let i;      // 用于循环迭代
    let keys;   // 用于存储对象的键
    // 如果a是数组
    if (Array.isArray(a)) {
      length = a.length;
      // 如果两个数组长度不同，则不相等
      if (length !== b.length) return false;
      // 递归比较数组中的每个元素
      for (i = length; i-- !== 0;)
        if (!isDeepEqualReact(a[i], b[i], ignoreKeys, debug)) return false;
      return true;
    }

    // 如果a是Map类型
    if (a instanceof Map && b instanceof Map) {
      // 如果Map的size不同，则不相等
      if (a.size !== b.size) return false;
      // 检查b中是否有a的所有键
      //@ts-ignore
      for (i of a.entries()) if (!b.has(i[0])) return false;
      // 递归比较Map中的每个值
      //@ts-ignore
      for (i of a.entries())
        if (!isDeepEqualReact(i[1], b.get(i[0]), ignoreKeys, debug))
          return false;
      return true;
    }

    // 如果a是Set类型
    if (a instanceof Set && b instanceof Set) {
      // 如果Set的size不同，则不相等
      if (a.size !== b.size) return false;
      // 检查b中是否有a的所有值
      //@ts-ignore
      for (i of a.entries()) if (!b.has(i[0])) return false;
      return true;
    }

    // 如果a和b都是ArrayBuffer的视图（例如TypedArray）
    if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
      //@ts-ignore
      length = a.length;
      // 如果长度不同，则不相等
      //@ts-ignore
      if (length !== b.length) return false;
      // 比较每个元素是否相同
      //@ts-ignore
      for (i = length; i-- !== 0;) if (a[i] !== b[i]) return false;
      return true;
    }

    // 如果a是正则表达式，比较它们的源和标志
    if (a.constructor === RegExp)
      return a.source === b.source && a.flags === b.flags;
    // 如果a有自定义的valueOf方法，使用valueOf进行比较
    if (a.valueOf !== Object.prototype.valueOf && a.valueOf)
      return a.valueOf() === b.valueOf();
    // 如果a有自定义的toString方法，使用toString进行比较
    if (a.toString !== Object.prototype.toString && a.toString)
      return a.toString() === b.toString();
    // 获取a的所有键
    keys = Object.keys(a);
    length = keys.length;
    // 如果a和b的键的数量不同，则不相等
    if (length !== Object.keys(b).length) return false;

    // 检查b是否有a的所有键
    for (i = length; i-- !== 0;)
      if (!Object.prototype.hasOwnProperty.call(b, keys[i])) return false;

    // 递归比较a和b的每个属性
    for (i = length; i-- !== 0;) {
      const key = keys[i];

      // 如果当前键在忽略列表中，则跳过比较
      if (ignoreKeys?.includes(key)) continue;

      // React特定：跳过React元素的_owner属性，因为它包含循环引用
      if (key === '_owner' && a.$$typeof) continue;

      // 递归比较对象中的每个属性
      if (!isDeepEqualReact(a[key], b[key], ignoreKeys, debug)) {
        // 如果开启debug模式，输出不相等的键
        if (debug) {
          // console.log(key);
        }
        return false;
      }
    }

    // 所有属性都相等，返回true
    return true;
  }

  // 特殊情况：检查a和b是否都是NaN
  return a !== a && b !== b;
}

/**
 * 使用深度比较来记忆一个值。
 * @param value 需要记忆的值。
 * @param ignoreKeys 在比较时忽略的键数组。
 * @returns 记忆化后的值。
 */
export function useDeepCompareMemoize(value: any, ignoreKeys?: any) {
  // 使用 useRef 钩子创建一个 ref 对象，用于存储上一次的值
  const ref = useRef();
  // 使用自定义的 isDeepEqual 函数比较当前值与上一次的值是否深度相等
  if (!isDeepEqualReact(value, ref.current, ignoreKeys)) {
    // 如果不相等，则将当前值赋给 ref 对象，以便下次比较
    ref.current = value;
  }
  // 返回 ref 对象当前的值
  return ref.current;
}
/**
 * 使用深度比较来触发副作用的React Hook。
 *
 * @param effect 将执行的副作用函数。
 * @param dependencies 副作用依赖项数组。
 * @param ignoreKeys 在比较时忽略的对象键数组。
 */
export default function useDeepCompareEffect(
  effect: React.EffectCallback, // 定义一个React副作用函数
  dependencies: DependencyList, // 定义副作用函数的依赖项数组
  ignoreKeys?: string[] // 可选参数，定义在深度比较时需要忽略的对象键数组
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( // 使用React的useEffect钩子
    effect, // 传入副作用函数
    useDeepCompareMemoize(dependencies || [], ignoreKeys) // 使用自定义的深度比较函数处理依赖项数组，如果依赖项未提供，则传入空数组
  );
}