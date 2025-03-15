/**
 * 延时等待函数
 * @param ms 等待的毫秒数
 * @returns Promise
 *
 * @example
 * await sleep(1000); // 等待1秒
 */
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 异步队列类 - 用于控制异步任务的执行顺序
 * 保证任务按照添加顺序依次执行
 */
export class AsyncQueue {
  private queue: (() => Promise<any>)[] = [];
  private running = false;

  /**
   * 添加异步任务到队列
   * @param task 要执行的异步任务
   * @returns Promise
   *
   * @example
   * const queue = new AsyncQueue();
   * await queue.add(async () => {
   *   const result = await someAsyncOperation();
   *   return result;
   * });
   */
  async add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      this.run();
    });
  }

  // 私有方法：执行队列中的任务
  private async run() {
    if (this.running) return;
    this.running = true;

    while (this.queue.length > 0) {
      const task = this.queue.shift();
      if (task) await task();
    }

    this.running = false;
  }
}

/**
 * 为 Promise 添加超时控制
 * @param promise 原始 Promise
 * @param ms 超时时间（毫秒）
 * @returns Promise
 *
 * @example
 * try {
 *   const result = await createTimeout(fetch('api/data'), 5000);
 * } catch (error) {
 *   // 处理超时或其他错误
 * }
 */
export const createTimeout = <T>(
  promise: Promise<T>,
  ms: number,
): Promise<T> => {
  let timeoutId: NodeJS.Timeout;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error("Timeout")), ms);
  });

  return Promise.race([promise, timeoutPromise]).finally(() =>
    clearTimeout(timeoutId),
  );
};

/**
 * 异步工具集合
 * 提供Promise相关的辅助功能
 *
 * @example
 * import { createTimeout } from './async';
 *
 * // 为Promise添加超时控制
 * const result = await createTimeout(
 *   fetch('api/data'),
 *   5000  // 5秒超时
 * ).catch(error => {
 *   if (error.message === 'Timeout') {
 *     console.log('请求超时');
 *   }
 * });
 */
