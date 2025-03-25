<template>
  <div class="user-home">
    <!-- 顶部栏 -->
    <el-header>
      <div class="header-container">
        <div class="l-content" @click="toHome">
          <h3>南京旅游服务平台</h3>
        </div>
        <div class="r-content">
          <!-- <el-tooltip class="item" effect="light" content="预约信息" placement="left-start">
          </el-tooltip> -->
          <div class="topbutton" style="display: flex;align-items: center;" @click="toReservation">
            <span class="reservation"
              style="display: inline-block; color: white;font-size: 24px;margin-right: 5px;"><i
                class="el-icon-star-off"></i></span>
            <span style="display: inline-block; color: white;
              font-weight: 600;
              font-size: 16px;">预约信息</span>
          </div>
          <div @click="toBestPath" class="topbutton"
            style="display: flex;align-items: center;margin-right: 20px;">
            <span style="display: inline-block; color: white;font-size: 24px;margin-right: 5px;">
              <i class="el-icon-guide"></i></span>
            <span style="display: inline-block; color: white;
              font-weight: 600;
              font-size: 16px;">路线规划</span>
          </div>
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
  data() {
    return {
      dialogVisible: true,
    };
  },
  methods: {
    toHome() {
      this.$router.push("/userHome");
    },
    toBestPath() {
      this.$router.push("/bestPath");
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
.topbutton {
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0 10px;
  border-radius: 10px;
  &:hover {
    box-shadow: 0 0 15px 0 rgba(255, 255, 255, 0.2);
    background-color: #c9c9c965;
  }
}
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