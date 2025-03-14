import { dataConvert } from "@shared/data-util";
import type { ILocalStorage } from "./ILocalStorage";

let localStorageEnabled = false;
try {
  globalThis.localStorage.setItem("1", "1");
  globalThis.localStorage.removeItem("1");
  localStorageEnabled = true;
} catch {
  //
}

class LocalStorage implements ILocalStorage {
  data: any = {};

  getItem(key: any): Promise<any> {
    return new Promise((resolve) => {
      if (localStorageEnabled) {
        const val = dataConvert.parseJson(
          globalThis.localStorage.getItem(key) || "",
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
  // @ts-ignore
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
