<template>
  <el-card class="login-container">
    <el-form ref="form" inline label-width="70px" :model="form" :rules="rules"
      label-position="left">
      <h3 class="login_title">系统登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入账号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login" style="margin-left: 110px;"
          @click="submit">登录</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>

<script>
import Cookie from "js-cookie";
import { getMenu } from "../api";
export default {
  name: "Login",
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        //跳转到首页
        this.$router.push("/home");
        if (valid) {
          //登录请求
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  width: 390px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  box-sizing: border-box;
  .el-input {
    width: 198px;
  }
  .login_title {
    text-align: center;
    margin-bottom: 40px;
    color: #505458;
  }
  .el-card__body,
  .el-main {
    padding: 0;
  }
}
</style>
