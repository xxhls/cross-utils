import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // 根据您的实际需求修改为您的API地址
  timeout: 5000, // 设置请求超时时间，单位为毫秒
  headers: {
    "Content-Type": "application/json", // 设置请求的Content-Type头部
  },
});

export const get = (url, params) => {
  return axiosInstance.get(url, { params });
};

export const post = (url, data) => {
  return axiosInstance.post(url, data);
};

const request = (options) => {
  if (options.method === "GET") {
    return get(options.url, options.params);
  } else if (options.method === "POST") {
    return post(options.url, options.data);
  }
};

export default request;

// 可以根据需要进一步封装其他请求方法，如PUT、DELETE等
