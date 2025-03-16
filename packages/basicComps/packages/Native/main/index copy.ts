import { timeUtils } from "@basicComps-shared/dataUtils";

let _capsule;

const getCapsuleShow = (value?: number) => {
  if (_capsule) {
    clearTimeout(_capsule);
  }
  _capsule = timeUtils.setTimeout(
    () => {
      if (jd && jd.changeMenuButtonStatus) {
        jd.changeMenuButtonStatus({ visible: true });
      }
    },
    value || 0,
    { _from: "native/index1" },
  );
};

const getCapsuleHide = (value?: number) => {
  if (_capsule) {
    clearTimeout(_capsule);
  }
  _capsule = timeUtils.setTimeout(
    () => {
      if (jd && jd.changeMenuButtonStatus) {
        jd.changeMenuButtonStatus({ visible: false });
      }
    },
    value || 0,
    { _from: "native/index2" },
  );
};

const native = {
  getCapsuleShow,
  getCapsuleHide,
};

export default native;
