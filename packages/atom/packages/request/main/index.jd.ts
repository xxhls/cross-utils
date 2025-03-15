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
  return jd.request({
    url,
    header: headers,
    method,
    data,
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
export default normalize(request, CONTAINER_NAME.JD);
