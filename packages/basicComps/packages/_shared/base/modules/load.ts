/**
 * 动态加载工具集合
 */
export const loadUtils = {
  /**
   * 动态加载JS文件
   * @param url JS文件地址
   * @param options 脚本属性
   * @returns Promise
   */
  js(url: string, options?: ScriptOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;

      // 设置额外的属性
      if (options) {
        Object.keys(options).forEach((key) => {
          script[key] = options[key];
        });
      }

      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
      document.head.appendChild(script);
    });
  },

  /**
   * 动态加载CSS文件
   * @param url CSS文件地址
   * @returns Promise
   */
  css(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load CSS: ${url}`));
      document.head.appendChild(link);
    });
  },
};

// 为了向后兼容
export const loadjs = loadUtils.js;

interface ScriptOptions {
  crossorigin?: string;
  [key: string]: any;
}
