import { Qin } from "@types-def/atom-interface";

export interface GetOrRemoveOptionStruct extends Qin.COptions {
  key: string;
  success?: (res: any) => any;
  fail?: (res: any) => any;
  complete?: (res: any) => any;
}

export interface GetOrRemoveSyncOptionStruct extends Qin.COptions {
  key: string;
}

export interface GetStorageSyncRes {
  data: any;
}

export type GetStorageRes = Promise<GetStorageSyncRes> | any;

export interface SetOptionStruct extends Qin.COptions {
  key: string;
  data:
    | undefined
    | null
    | string
    | Record<string, any>
    | any[]
    | number
    | Date
    | boolean;
  success?: (res: any) => any;
  fail?: (res: any) => any;
  complete?: (res: any) => any;
}

export interface SetSyncOptionStruct extends Qin.COptions {
  key: string;
  data:
    | undefined
    | null
    | string
    | Record<string, any>
    | any[]
    | number
    | Date
    | boolean;
}
