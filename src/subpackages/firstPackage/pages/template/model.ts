// import Taro from '@tarojs/taro';
// import * as templateApi from './service';
export default {
  namespace: 'template',
  state: {},
  effects: {
    *example({ payload:Page },{ select, call, put }){}
  },
  reducers: {
    updateState(state, { payload: data }) {
      return { ...state, ...data };
    }
  }
}
