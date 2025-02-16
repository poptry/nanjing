<template>
  <el-row>
    <el-col :span="8" style="padding-right: 10px;">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/images/hd-pf.jpg" alt="">
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2023-6-7</span></p>
          <p>上次登录地点：<span>武汉</span></p>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.user {
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  display: flex;
  align-items: center;

  img {
    width: 150px;
    height: 150px;
    margin-right: 40px;
    border-radius: 50%;
  }

  .user-info {
    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999999;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;

    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .icon {
    font-size: 30px;
    width: 80px;
    height: 80px;
    color: #fff;
    text-align: center;
    line-height: 80px;
  }

  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .price {
      font-size: 30px;
      height: 30px;
      margin-bottom: 10px;
      line-height: 30px;
    }

    .desc {
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
  }

  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}

.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;

  .el-card {
    width: 48%;
  }
}
</style>