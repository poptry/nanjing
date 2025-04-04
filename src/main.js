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
// 全局路由守卫;
router.beforeEach(async (to, from, next) => {
  const token = Cookie.get("token");
  const userRole = store.state.user.permission;
  // 首先判断token
  if (!token && to.name !== "login") {
    // 没有token，且去的不是登录页，跳到登录
    // console.log("么有token进入登录页面");
    next({ name: "login" });
    return;
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // 判断跳转的路由是否需要认证
    const requiresAuth = to.meta.role;
    // 判断角色和权限是否匹配
    if (userRole) {
      if (userRole === requiresAuth) {
        // console.log("权限一致放行");
        next(); //权限一致放行
        return;
      } else {
        // console.log("权限不一致，进入无权限页面");
        next({ name: "unauthorized" }); //不一致进无权限页
        return;
      }
    } else {
      //没有角色，去登录
      // console.log("没有角色信息存储，要登录");
      next({ name: "login" });
      return;
    }
  } else {
    // 不需要权限就直接进入
    // console.log("不需要权限，直接进入");
    next();
    return;
  }
});

new Vue({
  //把路由挂载到根实例
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
