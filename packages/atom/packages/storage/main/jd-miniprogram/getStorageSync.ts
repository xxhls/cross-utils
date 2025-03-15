import { GetStorageSyncRes } from "../types";
import { aliIn } from "@atom-shared/styleOptions";
import { CONTAINER_NAME } from "@atom-shared/constant";

const getStorageSync = (args: string): GetStorageSyncRes => {
  const argsIn = aliIn(args, CONTAINER_NAME.JD);
  return jd.getStorageSync(argsIn);
};

export default getStorageSync;
