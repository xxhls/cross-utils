import makeCancelable from "./makeCancelable";
import { TFetchParams } from "./INetwork";
import network from ".";

type TOutputPromise = Promise<any[]>;

/**
 * 处理好promise，返回数组[error,value]
 * 当error是null时，表示promise返回正常
 * @param {Promise}} promise
 */
export function p2Arry(promise: Promise<any>) {
  return promise
    .then((data) => {
      return [null, data];
    })
    .catch((err) => [err, null]);
}

export default function request(params: TFetchParams): TOutputPromise {
  const networkPromise = makeCancelable(network.fetch(params));

  const promise = p2Arry(networkPromise.promise);
  promise["cancel"] = networkPromise.cancel;
  return promise;
}
