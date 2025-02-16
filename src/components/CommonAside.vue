<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64"
    text-color="#fff" active-text-color="#ffd04b">
    <h3>{{ '后台管理系统'}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in menu" :key="item.name" :index="item.name">
      <i :class="`el-icon-${item.icon}`"></i>
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
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100vh;
  border-right: none;

  h3 {
    color: aliceblue;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
  }

  transition: all 1s 0;
}
</style>
