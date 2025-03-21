<template>
  <div class="user-home">
    <!-- 顶部栏 -->
    <el-header>
      <div class="header-container">
        <div class="l-content" @click="toHome">
          <h3>南京旅游服务平台</h3>
        </div>
        <div class="r-content">
          <el-tooltip class="item" effect="light" content="预约信息" placement="left-start">
            <span class="reservation"
              style="display: inline-block; color: white;font-size: 24px;margin-right: 20px;"
              @click="toReservation"><i class="el-icon-star-off"></i></span>
          </el-tooltip>
          <el-dropdown @command="handleClick">
            <span class="el-dropdown-link">
              <img src="@/assets/images/hd-pf.jpg" alt="" class="user">
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personal">个人中心</el-dropdown-item>
              <el-dropdown-item command="cancle">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <div class="routerContainer">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Cookie from "js-cookie";
export default {
  name: "UserMain",
  components: {},
  data() {
    return {};
  },
  methods: {
    toHome() {
      this.$router.push("/userHome");
    },
    //退出业务
    handleClick(command) {
      if (command === "cancle") {
        //清除token 清除menu
        Cookie.remove("token");
        //跳转到登录页面
        this.$router.push("/login");
      } else if (command == "personal") {
        this.$router.push("/personalInfo");
      }
    },
    toReservation() {
      this.$router.push("userReservation");
    },
  },
};
</script>

<style lang="less" scoped>
.user-home {
  height: 100%;
}
.el-header {
  padding: 0;
}
.l-content {
  color: #ffffff;
  font-size: 20px;
  margin-left: 10px;
  font-weight: 400;
  user-select: none;
  cursor: pointer;
}
.r-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  .reservation {
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      transform: scale(1.4);
      transform: rotate(45deg);
    }
  }
  .user {
    width: 40px;
    height: 40%;
    border-radius: 50%;
  }
}
.header-container {
  padding: 20px;
  background-color: #313131;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.whichCategory {
  background-color: rgb(42, 42, 42);
  color: #fff;
}
.routerContainer {
  height: 90%;
}
</style>