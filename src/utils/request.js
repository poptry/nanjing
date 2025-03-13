import axios from "axios";
import Cookies from "js-cookie";
const http = axios.create({
  //通用请求地址，请求前缀
  baseURL: "/api",
  timeout: 10000, //10秒超时
});
// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = Cookies.get("token"); // 获取 token
    if (token) {
      config.headers["Authorization"] = `${token}`; // 添加 token 到 Authorization Header
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response) {
      const status = error.response.status;
      if (status == 400) {
        return error.response;
      }
    }
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
export default http;
