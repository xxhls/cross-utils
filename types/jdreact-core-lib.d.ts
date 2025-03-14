declare module "@jdreact/jdreact-core-lib" {
  interface SafeAreaInsets {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  }

  export interface JDNativeSystemType {
    statusBarHeight: number;
    iphoneSafeAreaInsets?: SafeAreaInsets;
    iphoneSafeAreaBottom?: number;
    iphoneSafeAreaTop?: number;
    setBarMode(isDark: boolean): void;
    getClientVersion(): Promise<string>;
    getDeviceID(): Promise<string>;
  }

  export const JDNativeSystem: JDNativeSystemType;
}
