import { normalize } from "../common";
import { CONTAINER_NAME } from "@atom-shared/constant";

const removeStorage = normalize.removeStorage(
  (args) => wx.removeStorage(args),
  CONTAINER_NAME.WECHAT,
);

export default removeStorage;
