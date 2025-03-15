import { RequestOptions, ResponseData } from "./types";
import { normalize } from "./components/common";
import { CONTAINER_NAME } from "@atom-shared/constant";

function request(options: RequestOptions) {
  const {
    url,
    method,
    data,
    dataType,
    headers,
    timeout,
    success,
    fail,
    complete,
  } = options;
  const httpRequest = my.request;
  const _data: string | Record<string, any> = data;

  return httpRequest({
    url,
    headers,
    method,
    data: _data,
    timeout,
    dataType,
    success(res: ResponseData) {
      success && success(res);
    },
    fail(res) {
      fail && fail(res);
    },
    complete(res) {
      complete && complete(res);
    },
  });
}
export default normalize(request, CONTAINER_NAME.ALIPAY);
