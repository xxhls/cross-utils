import { promisify } from "@atom-shared/promisify";

export const LONG_DELAY = 3500; // 3.5 seconds
export const SHORT_DELAY = 2000; // 2 seconds
export function styleOptions(options) {
  const DEFAULT_REQUEST_OPTIONS = {
    title: "",
    icon: "none",
    duration: SHORT_DELAY,
  };
  if (typeof options === "string") {
    return {
      ...DEFAULT_REQUEST_OPTIONS,
      content: options,
    };
  } else {
    return {
      ...DEFAULT_REQUEST_OPTIONS,
      ...options,
    };
  }
}
export function normalize(api) {
  return (options?) => {
    const afterOptions = styleOptions(options);
    return promisify(api)(afterOptions);
  };
}
