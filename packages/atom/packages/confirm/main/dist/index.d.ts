interface ConfirmRes {
    confirm?: boolean;
    cancel?: boolean;
}

declare const showModal: (option: any) => Promise<ConfirmRes>;
declare const _default: {
    showModal: (option: any) => Promise<ConfirmRes>;
};

export { _default as default, showModal };
