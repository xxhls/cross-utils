/**
 * Promise工具集合
 * 提供Promise错误处理的辅助功能
 * 
 * @example
 * import { p2Arry } from './promise';
 * 
 * // 将Promise转换为数组形式
 * const [error, data] = await p2Arry(fetch('api/data'));
 * if (error) {
 *   console.error('请求失败:', error);
 * } else {
 *   console.log('请求成功:', data);
 * }
 */

// 将 Promise 转换为数组形式的异步函数，以便进行错误处理
export async function p2Arry<T>(promise: Promise<T>) {
    try {
        const data = await promise; // 等待 Promise 解决并获取其数据
        return [null, data]; // 如果成功，返回一个数组，第一个元素是 null，第二个元素是解决的数据
    } catch (err) {
        return [err]; // 如果 Promise 被拒绝，返回一个只包含错误对象的数组
    }
}


// https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
// 创建一个可取消的 Promise
export function makeCancelable<T>(promise: Promise<T>, cancel?: () => void, cancelCalled?: () => void) {
    let hasCanceled_ = false; // 用于跟踪取消状态的标志

    // 创建一个新的 Promise，它将包装原始的 Promise
    const wrappedPromise = new Promise<T>((resolve, reject) => {
        // 当原始 Promise 解决时
        promise.then((val) => {
            // 如果已经取消，调用 cancel 回调（如果提供） 否则解决包装的 Promise
            hasCanceled_ ? cancel?.() : resolve(val)
        }).catch((error) => { // 当原始 Promise 被拒绝时
            // 如果已经取消，调用 cancel 回调（如果提供）否则拒绝包装的 Promise
            hasCanceled_ ? cancel?.() : reject(error)
        });
    });

    // 返回一个包含包装的 Promise 和取消方法的对象
    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true; // 设置取消标志为 true
            cancelCalled?.(); // 调用 cancelCalled 回调（如果提供）
        },
    };
};

export interface CancelablePromise {
    promise: Promise<{}>
    cancel: () => void
}


// 定义泛型类 CPromise，T 表示 Promise 解决时的类型
export class CPromise<T> {
    // _promise 是内部使用的 Promise，用于处理取消逻辑
    private _promise: Promise<T>;
    
    // promise 是传递给 CPromise 的原始 Promise
    private promise: Promise<T>;
    
    // isCancelled 标志用于跟踪 Promise 是否已被取消
    private isCancelled: boolean;

    // 构造函数接受一个执行器函数，与标准的 Promise 相同
    constructor(executor: (
        resolve: (value: T) => void,
        reject: (reason?: any) => void
    ) => void) {
        // 初始化取消标志为 false
        this.isCancelled = false;

        // 创建原始 Promise，传入外部的执行器函数
        this.promise = new Promise<T>((resolve, reject) => {
            executor(resolve, reject);
        });

        // 创建一个内部 Promise，它将根据取消状态来解决或拒绝
        this._promise = new Promise<T>((resolve, reject) => {
            // 当原始 Promise 解决时，检查是否已取消
            this.promise.then((val) => {
                // 如果已取消，执行取消逻辑；否则正常解决
                this.isCancelled ? this.onCancel(reject) : resolve(val);
            }).catch((error) => {
                // 如果原始 Promise 拒绝时，检查是否已取消
                this.isCancelled ? this.onCancel(reject) : reject(error);
            });
        });
    }

    // onCancel 方法定义了取消 Promise 时执行的操作
    onCancel(reject) {
        // console.log('执行取消了');
        reject({ type: 'PromiseCanceled', msg: 'Promise canceled' });
    }

    // cancel 方法允许外部取消 Promise
    cancel(): void {
        this.isCancelled = true;
    }

    // then 方法覆盖了 Promise 的 then 方法，确保取消逻辑被考虑
    then<TResult1 = T, TResult2 = never>(
        onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | null | undefined,
        onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined
    ): Promise<TResult1 | TResult2> {
        return this._promise.then(onfulfilled, onrejected);
    }

    // catch 方法覆盖了 Promise 的 catch 方法
    catch<TResult = never>(
        onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined
    ): Promise<T | TResult> {
        return this._promise.catch(onrejected);
    }

    // finally 方法覆盖了 Promise 的 finally 方法
    async finally<U>(onfinally?: () => U | PromiseLike<U>): Promise<T> {
        return this._promise.finally(onfinally);
    }
}

// async function example() {
//     const p = new CPromise<string>((resolve, reject) => {
//         // Your asynchronous operation logic here
//         // Call resolve(value) or reject(reason) based on success or failure
//         setTimeout(() => {
//             resolve('abc')
//         }, 20);

//     });
//     console.log('看下这个p', p, p.cancel);
//     // Cancel the promise if needed
//     p.cancel();

//     try {
//         const result = await p;
//         console.log('result', result)
//         // Handle the resolved value
//     } catch (error) {
//         console.log('error', error)
//         // Handle the rejection reason, which will be "Promise cancelled" if canceled
//     } finally {
//         // Finally block logic
//         console.log('finally')
//     }

// }

// example();

