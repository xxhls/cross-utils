// 同步获取cookie
const get = (name) => {
  const allCookies = document.cookie;
  let cookieValue = "";
  if (allCookies) {
    const cookiesArray = allCookies.split("; "); // 分割所有的cookie
    cookiesArray.forEach((cookie) => {
      const [key, value] = cookie.split("="); // 分割键和值
      if (key == name) {
        cookieValue = value;
      }
    });
  }
  return cookieValue;
};

/**
 * 设置cookie
 * @param name cookie-name
 * @param value  cookie - value
 * @param daysToLive  cookie - 超时时间
 */
const set = (name, value, daysToLive?) => {
  var cookie = name + "=" + encodeURIComponent(value);
  if (typeof daysToLive === "number") {
    cookie += "; max-age=" + daysToLive * 24 * 60 * 60; // max-age单位是秒
  }
  document.cookie = cookie;
};
/**
 * 删除cookie
 * @param name cookie-name
 * @param value  cookie - value
 * @param daysToLive  cookie - 超时时间
 */
const del = (name) => {
  set(name, "", -1); // 设置为过去的时间即可删除
};
const getAll = async (): Promise<Record<string, string>> => {
  const cookies: Record<string, string> = {};
  document.cookie?.split(";").forEach((item) => {
    const [key, value] = item.split("=");
    cookies[key?.trim()] = value?.trim() || "";
  });
  return cookies;
};
const cookie = {
  get,
  set,
  del,
  getAll,
};

export default cookie;
