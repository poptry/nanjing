import Vue from "vue";
import VueRouter from "vue-router";
//创建路由组件
Vue.use(VueRouter);
//组件和路由映射
const routes = [
  {
    path: "/home",
    name: "home",
    component: () => import("@/views/Main.vue"), //懒加载
    children: [
      {
        path: "/scenic",
        name: "scenic",
        component: () => import("@/views/Scenic.vue"), //懒加载
      },
      {
        path: "/user",
        name: "user",
        component: () => import("@/views/User.vue"), //懒加载
      },
      //预定信息
      {
        path: "/reservation",
        name: "reservation",
        component: () => import("@/views/Reservation.vue"), //懒加载
      },
      //留言板
      {
        path: "/notes",
        name: "notes",
        component: () => import("@/views/Notes.vue"), //懒加载
      },
    ],
  },
  //登录路由
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"), //懒加载
  },
];
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
});

//将当前router实例对外暴露

export default router;
