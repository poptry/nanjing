import Vue from "vue";
import Vuex from "vuex";
import tab from "./tab";
import dynamicRoutes from "./dynamicRoutes";
import category from "./category";
import VuexPersistence from "vuex-persistedstate";
import user from "./user";
Vue.use(Vuex);
const PERSIST_PATH = [
  "tab.tabsList",
  "category.categoryList",
  "category.total",
  "user.permission",
];
//创建vuex实例
export default new Vuex.Store({
  modules: {
    tab,
    category,
    dynamicRoutes,
    user,
  },
  plugins: [
    VuexPersistence({
      storage: window.sessionStorage,
      paths: PERSIST_PATH,
    }),
  ],
});
