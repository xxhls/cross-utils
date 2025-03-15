/**
 * let Times = {};
 * time1\2\3\4\5... 属于点位
 *
 * set 存值，入参 1、2、3、4...
 * get 打印：当前序列中，的所有tiem
 *
 *
 */

let Times = {
  time0: window?.htmlLoad || 0,
};
let conTxt = {};
const set = (num) => {
  Times[`time${num}`] = new Date().getTime();
};
const getAllLong = (item, num) => {
  const time = Times[`time${num}`] - Times[`time1`];
  const time2 = Times[`time${num}`] - Times[`time${num - 1}`];
  conTxt[item] =
    `time${num} - time${num - 1}：${time2}——————time${num} - time${1}：${time};;;;;;`;
  return time2;
};
const get = () => {
  Object.keys(Times).forEach((item, i) => {
    const index = item.split("e")[1];
    getAllLong(item, index);
  });
  // console.error(conTxt);
};
const timeHandle = {
  get,
  set,
};
export default timeHandle;
