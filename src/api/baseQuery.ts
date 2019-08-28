import Taro, { getCurrentPages } from "@tarojs/taro";
import Query from "@/utils/request";
import { ENV, ONLINE_HOST, QA_HOST } from "@/configs/index";
import Tips from "@/utils/tips";

// 默认host
const API_HOST = ENV == "production" ? ONLINE_HOST : QA_HOST;

// // Query实例
const BASE_QUERY = new Query(API_HOST);
// 设置默认请求配置
BASE_QUERY.setDefaultUrlConfig({
  host: API_HOST,
  pathPrefix: "",
  model: "",
  path: "",
  pathPostfix: ""
});

// Request 拦截器
const requestCallback = function (request) {
  // console.warn("--request拦截器--: ", request);
  return request; 
};

// Response 拦截器:
const responseErrorCallbackDefault = function (response) {
  // console.warn("--- 响应拦截器 ---", response);
  const responseData = response.data;
  if (responseData.status) {
    return responseData;
  } else if (responseData.code >= 300 && responseData.code < 400) {
    // 300系错误
    Tip.modal("API-Error提示: code-300", JSON.stringify(responseData));
    console.error("API-Error提示: code-300", JSON.stringify(responseData));
  } else if (responseData.code >= 400 && responseData.code < 500) {
    // 400系错误
    Tip.modal("API-Error提示: code-400", JSON.stringify(responseData));
    console.error("API-Error提示: code-400", JSON.stringify(responseData));
  } else if (500 <= responseData.code && responseData.code < 600) {
    // 500系错误
    Tip.modal("API-Error提示: code-500", JSON.stringify(responseData));
    console.error("API-Error提示: code-500", JSON.stringify(responseData));
  } else if (responseData.code >= 600) {
    // 600系错误
  } else {
    Tip.modal("API-Error提示: code-600", JSON.stringify(responseData));
    console.error("API-Error提示: code-600", JSON.stringify(responseData));
  }
  return responseData; // 默认返回处理过的参数
};

// 设置api拦截器
BASE_QUERY.setRequestIntercepter(requestCallback);
BASE_QUERY.setResponseIntercepter(responseErrorCallbackDefault);

// export
export default BASE_QUERY;
