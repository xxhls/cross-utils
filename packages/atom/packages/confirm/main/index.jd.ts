import { normalize } from "./utils";
import { CONTAINER_NAME } from "@atom-shared/constant";
const showModal = normalize((args) => jd.showModal(args), CONTAINER_NAME.JD);
export { showModal };
export default {
  showModal,
};
