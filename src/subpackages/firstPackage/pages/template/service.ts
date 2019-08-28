import Request from '../../utils/request'
const apiRequest = new Request('template');

export const testApi = (data)=>{
  return apiRequest.query({})
}
