import Vue from "vue";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Router from "vue-router";
import router from "./router";
import store from "./store";

//引入cookie
import Cookie from "js-cookie";

Vue.config.productionTip = false;
Vue.use(ElementUI);

const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => {
    if (err.name !== "NavigationDuplicated") {
      throw err;
    }
  });
};
//全局路由守卫
// router.beforeEach((to, from, next) => {
//   //判断token存在吗
//   const token = Cookie.get("token");
//   if (!token && to.name !== "login") {
//     //token不存在，当前未登录，跳转到登录页面
//     next({ name: "login" });
//   } else if (token && to.name === "login") {
//     //存在token，跳转至首页
//     next({ name: "home" });
//   } else {
//     next();
//   }
// });

new Vue({
  //把路由挂载到根实例
  router,
  store,
  render: (h) => h(App),
  // created() {
  //   store.commit("addMenu", router);
  // },
}).$mount("#app");
