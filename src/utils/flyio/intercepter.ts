/**
 * @description 用于生成flyio.js的拦截器
 * @remind 目前没用!!!
 */

// Interface && Types
type Identity = <T>(params: T) => T;
// request-interface
type IntercepterRequestInput = (params: any) => boolean;
// response-interface
interface IntercepterResponseInput {
  error: (data: any) => any; // 请求失败的错误处理（标准http失败）
  default: (data: any) => any; // 非定义状态码的错误处理
  [propName: number]: (data: any) => any; // 指定状态码的错误处理， @formate: { 300: hook() }
};

/**
 * 创建request拦截器
 * @example
 * ```typescript
 *    const hock = (request)=>request;
 *    createRequestIntercepter(hock);
 * ```
 */
function createRequestIntercepter(hook: IntercepterRequestInput): Identity {
  return function <T>(request: T): T {
    // console.info("--- request请求拦截器 ---");
    hook(request);
    return request;
  };
};

/**
 * 创建response拦截器
 * @example
 * ```typescript
 *  const params = {
 *    401: (data: any) => any;
 *    error: (data: any) => any;
 *    default: (data: any) => any;
 *  }
 *  createResponseIntercepter(params);
 * ```
 */
function createResponseIntercepter(params: IntercepterResponseInput): any {
  return function(response: { data: any; status: number }) {
    // console.info("--- response返回拦截器 ---");
    if (response.status >= 200 && response.status < 300) {
      // 标准http请求成功 200 <= httpCode < 300
      return params.default(response);
    } else {
      // 标准http请求失败 httpCode != [200...299]
      params.error(response);
      console.error("网络请求失败: ", response);
    }
    return response;
  };
};

/**
 * 查看number是否在指定范围内（包含边界值）
 * @params: ( startNumber:number, endnumber:number, targetNumber:number )
 * @return: boolean
 */
function withinNumberScope(startNumber: number, endNumber: number, targetNumber: number): boolean {
  return targetNumber >= startNumber && targetNumber <= endNumber;
}

// output
module.exports = {
  createRequestIntercepter,
  createResponseIntercepter,
  withinNumberScope
}
// Export
export {
  createRequestIntercepter,
  createResponseIntercepter,
  withinNumberScope
};
// Export default
export default {
  createRequestIntercepter,
  createResponseIntercepter,
  withinNumberScope
};
