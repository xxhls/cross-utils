import { dataConvert } from "@basicComps-pkg/_shared/dataUtils";
import { ILocalStorage } from "./ILocalStorage";
import { AsyncStorage } from "react-native";

class LocalStorage implements ILocalStorage {
  getItem(key: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const st = setTimeout(() => {
        resolve(null);
      }, 400);
      AsyncStorage.getItem(key, (err, result) => {
        clearTimeout(st);
        if (err) {
          reject(err);
        }
        resolve(dataConvert.parseJson(result));
      });
    });
  }
  setItem(key: any, value: any): Promise<void> {
    value = dataConvert.stringify.value(value);
    return new Promise((resolve, reject) => {
      const st = setTimeout(() => {
        resolve();
      }, 400);
      AsyncStorage.setItem(key, value, (error) => {
        clearTimeout(st);
        if (error) {
          reject(error);
        }
        resolve();
      });
    });
  }
  removeItem(key: any): Promise<void> {
    return AsyncStorage.removeItem(key);
  }
}

const localStorage = new LocalStorage();

export default localStorage;
