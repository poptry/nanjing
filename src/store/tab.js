import Cookie from "js-cookie";
export default {
  state: {
    //面包屑数据
    tabsList: [
      {
        path: "/home",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home/Home",
      },
    ],
    menu: [
      {
        path: "/home",
        name: "home",
        label: "首页",
        icon: "s-home",
        url: "Home.vue",
      },
      {
        path: "/user",
        name: "user",
        label: "用户管理",
        icon: "user",
        url: "User.vue",
      },
      {
        path: "/category",
        name: "category",
        label: "分类管理",
        icon: "document-copy",
        url: "Category.vue",
      },
      {
        path: "/scenic",
        name: "scenic",
        label: "景点管理",
        icon: "video-play",
        url: "Mall.vue",
      },
      {
        path: "/reservation",
        name: "reservation",
        label: "预定信息管理",
        icon: "date",
        url: "Reservation.vue",
      },
      {
        path: "/notes",
        name: "notes",
        label: "留言板管理",
        icon: "message",
        url: "Notes.vue",
      },
    ],
  },
  mutations: {
    //更新面包屑
    selectMenu(state, val) {
      //判断添加的数据是否是首页
      if (val.name !== "home") {
        const index = state.tabsList.findIndex(
          (item) => item.name === val.name
        ); //存在返回索引，不存在返回-1
        if (index === -1) {
          state.tabsList.push(val);
        }
      }
    },
    //删除指定的面包屑
    closeTag(state, item) {
      const index = state.tabsList.findIndex((val) => val.name === item.name);
      state.tabsList.splice(index, 1);
    },

    // //设置menu的数据
    // setMenu(state, val) {
    //   state.menu = val;
    //   Cookie.set("menu", JSON.stringify(val));
    // },

    // //动态注册路由
    // addMenu(state, router) {
    //   //判断当前缓存中是否有数据
    //   if (!Cookie.get("menu")) return;
    //   const menu = JSON.parse(Cookie.get("menu"));
    //   state.menu = menu;
    //   //组装动态路由的数据
    //   const menuArray = [];
    //   menu.forEach((item) => {
    //     if (item.children) {
    //       item.children = item.children.map((item) => {
    //         item.component = () => import(`../views/${item.url}`);
    //         return item;
    //       });
    //       menuArray.push(...item.children);
    //     } else {
    //       item.component = () => import(`../views/${item.url}`);
    //       menuArray.push(item);
    //     }
    //   });
    //   //路由的动态添加
    //   menuArray.forEach((element) => {
    //     router.addRoute("Main", element);
    //   });
    // },
  },
};
