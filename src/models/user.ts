export default {
  namespace: "user",
  state: {},

  effects: {
    *updateUserInfo(){  }, { call, put }) {
      try {
        console.log( call, put );
      } catch (err) {
        console.error(err);
      }
    }
  },

  reducers: {
    updateState(state, { payload: data }) {
      return { ...state, ...data };
    }
  }
};
