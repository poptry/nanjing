<template>
  <el-menu class="el-menu-vertical-demo">
    <h3>{{ '后台管理系统'}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in menu" :key="item.name" :index="item.name"
      :class="$route.name == item.name ? `active` : ``">
      <i style="color: inherit;" :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    clickMenu(item) {
      //当页面的路由与跳转路由不一致的时候才跳转
      if (
        this.$route.path !== item.path &&
        !(this.$route.path === "/home" && item.path === "/")
      )
        this.$router.push(item.path);
      this.$store.commit("selectMenu", item);
    },
  },
  computed: {
    menu() {
      return this.$store.state.tab.menu;
    },
  },
};
</script>
<style lang="less" scoped>
.active {
  color: #409eff !important;
}
::v-deep .el-menu-item {
  color: #4b4a4a;
}
::v-deep .el-menu-item:hover {
  background-color: #c7c7c7da !important;
}
::v-deep .el-menu-item.is-active {
  background-color: #e4e4e4da !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  background-color: #e4e4e4da;
}
.el-menu {
  height: 100vh;
  border-right: none;
  h3 {
    height: 60px;
    color: rgb(240, 240, 240);
    background-color: #333;
    text-align: center;
    line-height: 60px;
    font-size: 16px;
    font-weight: 400;
  }
  transition: all 1s 0;
}
</style>
