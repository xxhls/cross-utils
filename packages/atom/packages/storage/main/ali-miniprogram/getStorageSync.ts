import { GetStorageSyncRes } from "../types";
import { isDingdingMiniapp } from "@atom-shared/miniappEnvApp";
import { aliIn, styleIn } from "@atom-shared/styleOptions";
import { CONTAINER_NAME } from "@atom-shared/constant";

// 出参抹平
const result = (args: string) => {
  const s = my.getStorageSync(aliIn(args, CONTAINER_NAME.ALIPAY));
  if (typeof s === "object") return s.data;
};

const getStorageSync = (args: string): GetStorageSyncRes =>
  isDingdingMiniapp
    ? dd.getStorageSync(styleIn(args, CONTAINER_NAME.ALIPAY))
    : result(args);

export default getStorageSync;
