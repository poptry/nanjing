<template>
  <div class="header-container">
    <div class="l-content">
      <el-button style="margin-right: 20px;" @click="handleMenu" icon="el-icon-menu"
        size="mini"></el-button>
      <!-- 面包屑 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">
          {{ item.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>

    </div>
    <div class="r-content">
      <el-dropdown @command="handleClick">
        <span class="el-dropdown-link">
          <img src="../assets/images/hd-pf.jpg" alt="" class="user">
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item command="cancle">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
import Cookie from "js-cookie";
import { mapState } from "vuex";
export default {
  data() {
    return {
      property: "value",
    };
  },
  methods: {
    handleMenu() {
      this.$store.commit("collaspseMenu");
    },
    //退出业务
    handleClick(command) {
      if (command === "cancle") {
        //清除token 清除menu
        Cookie.remove("token");
        Cookie.remove("menu");
        //跳转到登录页面
        this.$router.push("/login");
      }
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>
<style lang="less" scoped>
.header-container {
  padding: 0 20px;
  background-color: #333;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .text {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
  }

  .r-content {
    .user {
      width: 40px;
      height: 40%;
      border-radius: 50%;
    }
  }

  .l-content {
    display: flex;
    align-items: center;

    ::v-deep .el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-weight: normal;

        &.is-link {
          color: #666;
        }
      }

      &:last-child {
        .el-breadcrumb__inner {
          color: #fff;
        }
      }
    }
  }
}
</style>