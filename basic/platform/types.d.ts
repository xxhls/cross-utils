interface Window {
    opera?: any;
}

interface Navigator {
    vendor?: string;
}

// 扩展全局 navigator 对象
declare global {
    interface Navigator {
        vendor?: string;
    }
    interface Window {
        opera?: any;
    }
}

export {};