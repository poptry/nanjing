// store/modules/category.js
import { getCategoryList } from "@/api"; // 引入分类列表数据
export default {
  state: {
    categoryList: [], // 分类列表
    total: 0, // 分类总数
  },
  mutations: {
    // 设置分类列表
    setCategoryList(state, categories) {
      state.categoryList = categories;
    },
    // 设置分类总数
    setTotal(state, total) {
      state.total = total;
    },
  },
  actions: {
    //获取分类
    async getCategoryList({ commit }, page) {
      const { data } = await getCategoryList(page);
      commit("setCategoryList", data.data);
      commit("setTotal", data.total);
    },
  },
};
