import { isDingdingMiniapp } from "@atom-shared/miniappEnvApp";
import { CONTAINER_NAME } from "@atom-shared/constant";
import { normalize } from "../common";

const removeStorage = normalize.removeStorage(
  (args) =>
    isDingdingMiniapp ? dd.removeStorage(args) : my.removeStorage(args),
  CONTAINER_NAME.ALIPAY,
);

export default removeStorage;
