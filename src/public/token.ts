/**
 * Readme:
 * 自定义“获取fanink的token并保存”的方法
 */
import Taro from "@tarojs/taro";
import Dayjs from 'dayjs';
import { getToken } from '@/api/regist';

// 保存token的key
const TOKEN_KEY = "User-Token";
// 最后一次请求的时间
let LAST_TIME_GET_TOKEN: string | undefined = undefined;

/**
 * 保存 storage token
 * @param (token:string)
 */
function saveStorageToken(token: string): void {
  Taro.setStorage({ key: TOKEN_KEY, data: token })
}

/**
 * 删除 storage token
 */
function removeStorageToken(): void {
  Taro.removeStorageSync(TOKEN_KEY);
}

/**
 * 获取 storage token
 * @return (token:string)
 */
function getStorageToken(): string {
  return Taro.getStorageSync(TOKEN_KEY);
}

/**
 * @description 更新 token ( 获取新的token，并保存到storage )
 * @remind '一秒内多次获取的token，只有第一次的获取被执行'
 * @return (token:string)
 */
async function updateToken(): Promise<any> {
  try {
    const INTERVAL: number = 1000;// 发起get-token间隔时间
    const currentDate = new Date().toISOString();// 当前发起update-token函数的时间
    const canGetToken: boolean = (LAST_TIME_GET_TOKEN
      && Math.abs(Dayjs(currentDate).diff(LAST_TIME_GET_TOKEN, 'ms')) > INTERVAL)
      || !LAST_TIME_GET_TOKEN;// [true条件]: (last-get-toekn-time（上次发起时间） - current-get-token-time（本次发起时间） < INTERVAL(间隔时间)) || first-get-token(第一次发起)
    let token: string = '';// token
    if (canGetToken) {
      LAST_TIME_GET_TOKEN = new Date().toISOString();
      const { code } = await Taro.login();// wechat-userinfo-code;
      // 获取token
      const httpResponse = await getToken({
        code: code,
      });
      if (httpResponse.status) {
        //获取token成功
        token = httpResponse.data.token;
        saveStorageToken(token);// 保存 token 到 storage
      } else {
        //获取token失败
        throw (httpResponse);
      }
    }
    return token;//@return: '' || 'new-toekn';
  } catch (error) {
    return Promise.reject(error);// 失败返回
  }
}

// export
export {
  updateToken,
  getStorageToken,
  saveStorageToken,
  removeStorageToken,
}
// export default
export default {
  updateToken,
  getStorageToken,
  saveStorageToken,
  removeStorageToken,
};