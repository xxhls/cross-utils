export interface ILocalStorage {
  getItem(key): Promise<any>;

  setItem(key, value): Promise<void>;

  removeItem(key): Promise<void>;
}
