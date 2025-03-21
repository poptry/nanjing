import Vue from "vue";
import VueRouter from "vue-router";
//创建路由组件
Vue.use(VueRouter);
//组件和路由映射
const routes = [
  // 管理员路由
  {
    path: "/",
    name: "main",
    component: () => import("@/views/administrator/Main.vue"), //懒加载
    redirect: "/home",
    meta: { requiresAuth: true, role: "admin" },
    children: [
      // 首页
      {
        path: "home",
        name: "home",
        meta: { requiresAuth: true, role: "admin" },
        component: () => import("@/views/administrator/Home.vue"), //懒加载
      },
      //景点信息
      {
        path: "scenic",
        name: "scenic",
        meta: { requiresAuth: true, role: "admin" },
        component: () => import("@/views/administrator/Scenic.vue"), //懒加载
      },
      //用户
      {
        path: "user",
        name: "user",
        meta: { requiresAuth: true, role: "admin" },
        component: () => import("@/views/administrator/User.vue"), //懒加载
      },
      //分类信息
      {
        path: "category",
        name: "category",
        meta: { requiresAuth: true, role: "admin" },
        component: () => import("@/views/administrator/Category.vue"),
      },
      //预定信息
      {
        path: "reservation",
        name: "reservation",
        meta: { requiresAuth: true, role: "admin" },
        component: () => import("@/views/administrator/Reservation.vue"), //懒加载
      },
      //留言板
      {
        path: "notes",
        name: "notes",
        meta: { requiresAuth: true, role: "admin" },
        component: () => import("@/views/administrator/Notes.vue"), //懒加载
      },
      {
        path: "/personal",
        name: "personal",
        meta: { requiresAuth: true, role: "admin" },
        component: () => import("@/views/PersonalInfo.vue"),
      },
    ],
  },
  // 用户路由
  {
    path: "/userMome",
    name: "userMome",
    meta: { requiresAuth: true, role: "user" },
    component: () => import("@/views/user/UserMain.vue"),
    children: [
      {
        path: "/userHome",
        name: "userHome",
        meta: { requiresAuth: true, role: "user" },
        component: () => import("@/views/user/UserHome.vue"),
      },
      {
        path: "/userReservation",
        name: "userReservation",
        meta: { requiresAuth: true, role: "user" },
        component: () => import("@/views/user/UserReservation.vue"),
      },
      {
        path: "/attraction:scenicData",
        name: "attraction",
        meta: { requiresAuth: true, role: "user" },
        component: () => import("@/views/user/Attraction.vue"),
      },
      {
        path: "/personalInfo",
        name: "personalInfo",
        meta: { requiresAuth: true, role: "user" },
        component: () => import("@/views/PersonalInfo.vue"),
      },
    ],
  },

  //登录路由
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"), //懒加载
  },
  // 无权限页面
  {
    path: "/unauthorized",
    name: "unauthorized",
    component: () => import("@/views/Unauthorized.vue"),
  },
  // 无关路径
  {
    path: "*", // 匹配任何未知路径
    component: () => import("@/views/NotFound.vue"), //显示丢失页面或 404 页面
  },
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 在路由初始化时，检查是否有动态路由保存
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes, // (缩写) 相当于 routes: routes
  scrollBehavior(to, from, savedPosition) {
    // 路由跳转时滚动到页面顶部
    return { x: 0, y: 0 };
  },
});

//将当前router实例对外暴露

export default router;
