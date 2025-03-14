declare module "@tarojs/plugin-platform-h5/dist/taroApis" {
  interface Page {
    route: string;
    options: Record<string, string>;
  }

  export function getCurrentPages(): Page[];
}
