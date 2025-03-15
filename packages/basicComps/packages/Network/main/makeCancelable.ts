// https://reactjs.org/blog/2015/12/16/ismounted-antipattern.html
const makeCancelable = (promise: Promise<{}>, cancel?: () => void) => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise
      .then((val) => {
        hasCanceled_ ? cancel?.() : resolve(val);
      })
      .catch((error) => {
        hasCanceled_ ? cancel?.() : reject(error);
      });
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

export interface CancelablePromise {
  promise: Promise<{}>;
  cancel: () => void;
}

export default makeCancelable;

/**
 * 带取消方法的Promise
 */
export class CPromise<T> {
  private _promise: Promise<T>;
  private promise: Promise<T>;
  private isCancelled: boolean;

  constructor(
    executor: (
      resolve: (value?: T | PromiseLike<T>) => void,
      reject: (reason?: any) => void,
    ) => void,
  ) {
    this.isCancelled = false;

    // const wrappedExecutor = (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => {
    //     executor(resolve, reject);
    // };

    this.promise = new Promise<T>((resolve, reject) => {
      executor(resolve, reject);
    });

    this._promise = new Promise<T>((resolve, reject) => {
      this.promise
        .then((val) => {
          this.isCancelled ? this.onCancel(reject) : resolve(val);
        })
        .catch((error) => {
          this.isCancelled ? this.onCancel(reject) : reject(error);
        });
    });
  }

  onCancel(reject) {
    reject({ type: "PromiseCanceled", msg: "Promise canceled" });
  }

  cancel(): void {
    this.isCancelled = true;
  }

  then<TResult1 = T, TResult2 = never>(
    onfulfilled?:
      | ((value: T) => TResult1 | PromiseLike<TResult1>)
      | null
      | undefined,
    onrejected?:
      | ((reason: any) => TResult2 | PromiseLike<TResult2>)
      | null
      | undefined,
  ): Promise<TResult1 | TResult2> {
    return this._promise.then(onfulfilled, onrejected);
  }

  catch<TResult = never>(
    onrejected?:
      | ((reason: any) => TResult | PromiseLike<TResult>)
      | null
      | undefined,
  ): Promise<T | TResult> {
    return this._promise.catch(onrejected);
  }

  async finally<U>(onfinally?: () => U | PromiseLike<U>): Promise<T> {
    return this._promise.finally(onfinally);
  }
}
