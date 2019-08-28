/**
 * 设置常用的 regex“正则表达式”
 */

// 全部为“中文”
export const IS_ALL_CHINESE = /^[\u4e00-\u9fa5]+$/;
// "中文"
export const IS_CHINESE = /[\u4e00-\u9fa5]/;
// email
export const EMAIL = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
// mobile
export const MOBILE = /^1[3-9]\d{9}$/;
// phone(座机,固定电话)
export const FIXED_TELEPHONE = /^(0\d{2,3}\-)?([2-9]\d{6,7})+(\-\d{1,6})?$/;
