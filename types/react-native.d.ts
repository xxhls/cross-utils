declare module "react-native" {
  export interface AsyncStorage {
    getItem(
      key: string,
      callback?: (error?: Error, result?: string) => void,
    ): Promise<string | null>;
    setItem(
      key: string,
      value: string,
      callback?: (error?: Error) => void,
    ): Promise<void>;
    removeItem(key: string, callback?: (error?: Error) => void): Promise<void>;
  }

  export const AsyncStorage: AsyncStorage;

  export const Platform: {
    OS: "ios" | "android";
    select: <T>(specifics: { ios?: T; android?: T }) => T;
  };

  export const StatusBar: {
    currentHeight?: number;
    setBarStyle: (style: "light-content" | "dark-content") => void;
  };

  export const Dimensions: {
    get: (dimension: "window" | "screen") => {
      width: number;
      height: number;
      scale: number;
      fontScale: number;
    };
  };
}
