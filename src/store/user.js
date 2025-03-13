export default {
  state: {
    permission: "",
  },
  mutations: {
    setPermission(state, per) {
      state.permission = per;
    },
  },
};
