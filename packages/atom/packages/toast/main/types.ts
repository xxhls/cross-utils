export interface ShowToastOption {
  title: string;
  icon?: "success" | "fail" | "none";
  duration?: number;
  success?: () => any;
  fail?: (res) => any;
  complete?: (res?) => any;
}
export interface HideToastOption {
  success?: () => any;
  fail?: (res) => any;
  complete?: (res?) => any;
}

export interface WebQueueOption {
  title: string;
  duration?: number;
  icon?: "success" | "fail" | "none";
  success?: () => void;
  fail?: (res) => void;
  complete?: (res?) => void;
}
