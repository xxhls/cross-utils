import { imageUtils } from "../../dataUtils";
export { imageUtils };

// 导出常用方法
export const {
  validateUrl,
  format: { url: parseImgUrl, advanced: imagesFormat },
} = imageUtils;
