import request from './baseQuery';
import { IdCardType } from '@/types/index';
const MODEL = 'users';

// 注册用户信息
export function template(payload: { [x: string]: any }): Permise<{ [x:string]: any }> {
  return request.query({
    model: MODEL,
    method: "GET",
    path: "/api_path",
    bodyPayload: payload
  });
}

// EXPORT
export default {};
