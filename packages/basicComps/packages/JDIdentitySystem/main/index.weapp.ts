const visitkey = process.argv.includes("--blended")
  ? require("visitkey")
  : {
      checkVisitKey: () => {
        return "taro-blended-uuid";
      },
    };

const getEid = (): string => {
  return visitkey.checkVisitKey();
};
export const getUUID = (): any => {};
