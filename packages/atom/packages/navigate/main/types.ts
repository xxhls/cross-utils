import { Qin } from "@types-def/atom-interface";

export interface IPushOptions extends Qin.COptions {
  url: string;
  isHash?: boolean;
  refresh?: boolean;
  events?: Object;
  success?: () => void;
  fail?: (res: any) => void;
  complete?: (res?: any) => void;
}

export interface IPopOptions extends Qin.COptions {
  success?: () => void;
  fail?: (res: any) => void;
  complete?: (res?: any) => void;
}

export interface IGoOptions extends Qin.COptions {
  step?: number;
  data?: number;
  success?: () => void;
  fail?: (res: any) => void;
  complete?: (res?: any) => void;
}

export interface IReplaceOptions extends Qin.COptions {
  url: string;
  isHash?: boolean;
  refresh?: boolean;
  success?: () => void;
  fail?: (res: any) => void;
  complete?: (res?: any) => void;
}

export interface IReLaunchOptions extends Qin.COptions {
  url: string;
  isHash?: boolean;
  refresh?: boolean;
  success?: () => void;
  fail?: (res: any) => void;
  complete?: (res?: any) => void;
}

export interface ISwitchTabOptions extends Qin.COptions {
  url: string;
  success?: () => void;
  fail?: (res: any) => void;
  complete?: (res?: any) => void;
}

export interface INavigate extends Qin.COptions {
  push: (options: IPushOptions) => Promise<null>;
  go: (options: IGoOptions) => Promise<null>;
  back: (options?: IPopOptions) => Promise<null>;
  replace: (options: IReplaceOptions) => Promise<null>;
  reLaunch: (options: IReLaunchOptions) => Promise<null>;
}
