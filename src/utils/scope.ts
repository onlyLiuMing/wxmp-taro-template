/**
 * Readme:
 * 封装的用于“获取，检查，自动获取，微信权限”的方法
 */

import Taro from "@tarojs/taro";
import without from 'lodash/without'

type ScopeName =
  | "userInfo"
  | "userLocation"
  | "address"
  | "invoiceTitle"
  | "invoice"
  | "werun"
  | "record"
  | "writePhotosAlbum"
  | "camera";
type InputScopeNameArgs = ScopeName | ScopeName[];

/**
 * check是否有微信权限（ 参数为 String ）
 * @param scopeName
 * @return (Promise<any>)
 *  <result> boolean
 */
function _hasWechatScope(scopeName: ScopeName): Promise<any> {
  return Taro.getSetting().then(res => {
    const { authSetting } = res;
    const targetAuthSettingKey = `scope.${scopeName}`;
    return authSetting[targetAuthSettingKey] ? true : false; // 排除 undefinde,null,'' 的影响
  });
}

/**
 * get 微信 scope 的授权（参数为 String）
 * @params: scopeName<ScopeName>
 * @return: Promise<any>
 *  <result> true
 *  <error> { scopeName: string, msg: any }
 */
function _getWechatScope(scopeName: ScopeName): Promise<any> {
  console.warn(`get ${scopeName} scope`);
  switch (scopeName) {
    case "userInfo":
      return _getWechatUserInfoScope();
      break;
    default:
      return Taro.authorize({ scope: `scope.${scopeName}` })
        .then(res => {
          return Promise.resolve(true) ; // 统一输出 boolean
        })
        .catch(error => {
          return Promise.reject({ scopeName: scopeName, msg: error }); // 统一输出 { scopeName: string, msg: any }
        });
      break;
  }
}

/**
 * check 是否有微信权限（ 参数为 Array<ScopeName> ）
 * @param scopeName
 * @return (Promise<any>)
 *  <result> [boolean]
 *  <error> { scopeName:string, msg: {} }
 */
function _hasWechatScopeList(scopeNames: ScopeName[]): Promise<any> {
  let promiseList = scopeNames.map(name => {
    return _hasWechatScope(name).catch(error => {
      return error;
    });
  });
  return Promise.all(promiseList).catch(error => {
    // @params: { scopeName:string, msg: {} }
    console.error("getScopeList fail：", error);
    return error;
  });
}

/**
 * get 微信 scopeList 的授权( 参数为 Array )
 * @params: scopeName<ScopeName[]>
 * @return:
 *  Promise<any>
 *  <result> [ ScopeName ]
 *  <error>  { [ScopeName]: <msg>{} }
 */
 async function _getWechatScopeList(scopeNames: ScopeName[]): Promise<any> {
  let needGetScopeList: ScopeName[] = [];
  let getScopePromiseList:Promise<any>[] = [];
  let errorMap: object = {};
  for(var name of scopeNames){
    let hasScope = await _hasWechatScope(name);
    if(!hasScope ){
      needGetScopeList.push(name)
    }
  }
  getScopePromiseList = needGetScopeList.map(scopeName=>{
    return _getWechatScope(scopeName);
  });
  await Promise.all(getScopePromiseList).catch(error=>{
    errorMap[error.scopeName] = error.msg;
  })
  if(Object.keys(errorMap).length>0){
    return Promise.reject(errorMap);
  }
  return Promise.resolve(needGetScopeList)
}

/**
 * 获取微信 userinfo 的授权
 * @params: void
 * @return: Promise
 *  <result>true
 *  <error>false
 */
function _getWechatUserInfoScope(): Promise<any> {
  console.info("get WechatUserInfo scope: 跳转到授权页");
  Taro.reLaunch({url:'/subpackages/distantPages/pages/getWechatUserInfoScope/getWechatUserInfoScope'})
  return Promise.resolve(true);
}

/**** vvvvvvvv合并函数vvvvvvvv ****/

/**
 *  是否拥有目标权限
 * @params: string<InputScopeNameArgs>
 * @return: Promise<any>  then((hasScope:boolean)=>{})
 * ** example **
 *    hasScope( 'userinfo' )
 *      .then((hasScope:boolean)=>{
 *          console.log(hasScope);
 *       })
 */
function hasScope(scopeName: InputScopeNameArgs): Promise<any> {
  if (typeof scopeName === "string") {
    return _hasWechatScope(scopeName);
  } else if (typeof scopeName === "object") {
    return _hasWechatScopeList(scopeName);
  }
  return Promise.resolve(false);
}

/**
 *  获取目标权限
 * @params: string<InputScopeNameArgs>
 * @return: Promise<any> 
 * ** example **
 *    getScope( 'userinfo' )
 */
function getScope(scopeName: InputScopeNameArgs):Promise<any> {
  if (typeof scopeName === "string") {
    return _getWechatScope(scopeName);
  } else if (typeof scopeName === "object" && Array.isArray(scopeName)) {
    return _getWechatScopeList(scopeName);
  }
  return Promise.reject('执行出错');
}

/**
 *  自动获取目标权限
 * @params: string<InputScopeNameArgs>
 * @return: Promise<any>
 *  <result> []
 *  <error>  {}<as getWechatScopeList error>
 * ** example **
 *    hasScope( 'userinfo' );
 *    hasScope( ['userinfo','camera'] );
 */
async function autoGetScope(scopeName: InputScopeNameArgs): Promise<any> {
  try {
    if (typeof scopeName === "string") {
      // @params is string
      return _hasWechatScope(scopeName).then((hasScope: boolean) => {
        if (!hasScope) {
          console.warn("auto get scope: " + scopeName);
          return _getWechatScope(scopeName);
        }
      });
    } else if (typeof scopeName === "object"&&Array.isArray(scopeName)) {
      // @params is array
      const hasScopeList = await _hasWechatScopeList(scopeName)
      const needGetScopeList = without(scopeName.map((name,index)=>{
        if(!hasScopeList[index]){
          return name
        }
        return null;
      }),null,undefined,'');
      return _getWechatScopeList(needGetScopeList)
    }
  } catch (error) {
    let errorInfo = { msg: "执行错误" };
    console.error("autoGetScope fail：", errorInfo);
    return Promise.reject(`autoGetScope fail: ${errorInfo}`);
  }
  return Promise.reject();
}

// export
export { hasScope, getScope, autoGetScope, ScopeName };
// export default
export default {
  hasScope,
  getScope,
  autoGetScope
};
