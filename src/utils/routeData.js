export const adminRoutes = {
  path: "/",
  name: "main",
  component: () => import("@/views/administrator/Main.vue"), //懒加载
  redirect: "/home",
  children: [
    // 首页
    {
      path: "home",
      name: "home",
      component: () => import("@/views/administrator/Home.vue"), //懒加载
    },
    //景点信息
    {
      path: "scenic",
      name: "scenic",
      component: () => import("@/views/administrator/Scenic.vue"), //懒加载
    },
    //用户
    {
      path: "user",
      name: "user",
      component: () => import("@/views/administrator/User.vue"), //懒加载
    },
    //分类信息
    {
      path: "category",
      name: "category",
      component: () => import("@/views/administrator/Category.vue"),
    },
    //预定信息
    {
      path: "reservation",
      name: "reservation",
      component: () => import("@/views/administrator/Reservation.vue"), //懒加载
    },
    //留言板
    {
      path: "notes",
      name: "notes",
      component: () => import("@/views/administrator/Notes.vue"), //懒加载
    },
  ],
};
