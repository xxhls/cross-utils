import { dataConvert } from "../../utils/dataUtils";
import { ILocalStorage } from "./ILocalStorage";

let localStorageEnabled = false;
try {
  window.localStorage.setItem("1", "1");
  window.localStorage.removeItem("1");
  localStorageEnabled = true;
} catch (e) {
  //
}

class LocalStorage implements ILocalStorage {
  data: any = {};

  getItem(key: any): Promise<any> {
    return new Promise((resolve) => {
      if (localStorageEnabled) {
        const val = dataConvert.parseJson(
          window.localStorage.getItem(key) || "",
        );
        return resolve(val);
      } else {
        return resolve(this.data[key]);
      }
    });
  }
  setItem(key: any, value: any): Promise<void> {
    value = dataConvert.stringify.value(value);
    if (localStorageEnabled) {
      localStorage.setItem(key, value);
    } else {
      this.data[key] = value;
    }
    return new Promise((resolve) => resolve());
  }
  removeItem(key: any): Promise<any> {
    if (localStorageEnabled) {
      localStorage.removeItem(key);
    } else {
      // @ts-ignore
      return delete this.data[key];
    }
  }
}
const localStorage = new LocalStorage();

export default localStorage;
