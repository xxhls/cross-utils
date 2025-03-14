export interface ILocalStorage {
  getItem(key: string): Promise<any>;

  setItem(key: string, value: any): Promise<void>;

  removeItem(key: string): Promise<void>;
}
