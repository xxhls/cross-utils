import { normalize } from "../common";
import { CONTAINER_NAME } from "@atom-shared/constant";

const removeStorage = normalize.removeStorage(
  (args) => jd.removeStorage(args),
  CONTAINER_NAME.JD,
);

export default removeStorage;
