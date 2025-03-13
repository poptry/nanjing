<template>
  <div class="main">
    <el-container>
      <el-aside width="auto">
        <common-aside />
      </el-aside>
      <el-container>
        <el-header>
          <common-header />
        </el-header>
        <common-tag></common-tag>
        <el-main>
          <!-- 路由出口 路由匹配到的组件渲染到这里-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import CommonAside from "../../components/CommonAside.vue";
import CommonHeader from "../../components/CommonHeader.vue";
import CommonTag from "../../components/CommonTag.vue";

export default {
  data() {
    return {};
  },
  components: {
    CommonAside,
    CommonHeader,
    CommonTag,
  },
};
</script>
<style scoped>
.main {
  height: 100vh;
}
.el-header {
  padding: 0;
}
.el-container {
  height: 100%;
}
.el-main {
  height: 100%;
}
</style>