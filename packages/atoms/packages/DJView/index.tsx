import { isRN } from "@shared/multi-platform";
import RNComponent from "./index.rn";
import TaroComponent from "./index.taro";

let component = undefined;

if (isRN) {
  component = RNComponent;
} else {
  component = TaroComponent;
}

export default component;
