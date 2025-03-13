<template>
  <div class="container">
    <el-card class="login-container">
      <div class="register" @click="isLogin = !isLogin">
        <span class="go-register">
          {{ isLogin ? "注册" : "登录" }}
          <i class="el-icon-right" style="display: block;"></i>
        </span>
      </div>
      <el-form v-if="isLogin" ref="form" inline label-width="70px" :model="form" :rules="rules"
        label-position="left">
        <h3 class="login_title">南京旅游服务平台</h3>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-radio-group v-model="form.role">
            <el-radio label="admin">管理员</el-radio>
            <el-radio label="user">普通用户</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login" style="margin-left: 110px;"
            @click="submit">登录</el-button>
        </el-form-item>
      </el-form>
      <div v-else>
        <el-form ref="registerForm" inline label-width="80px" :model="registerForm"
          :rules="registerRules" label-position="left">
          <h3 class="login_title">系统注册</h3>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="registerForm.username" placeholder="请输入账号"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input v-model="registerForm.phone" placeholder="请输入电话"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="registerForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="registerForm.password"
              placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repassword">
            <el-input type="password" v-model="registerForm.repassword"
              placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="角色" prop="role">
            <el-radio-group v-model="registerForm.role">
              <el-radio label="admin">管理员</el-radio>
              <el-radio label="user">普通用户</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login" style="margin-left: 110px;"
              @click="submit">注册</el-button>
          </el-form-item>
        </el-form>
      </div>

    </el-card>
  </div>
</template>

<script>
import Cookie from "js-cookie";
import { login, register } from "../api";
export default {
  name: "Login",
  data() {
    var checkPwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkRePwd = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.repassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      isLogin: true,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      registerRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: checkRePwd, trigger: "blur" },
        ],
        phone: [
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        repassword: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: checkPwd, trigger: "blur" },
        ],
      },
      form: {
        username: "yhb",
        password: "123",
        role: "admin",
      },
      registerForm: {
        username: "",
        password: "",
        repassword: "",
        email: "",
        role: "admin",
        phone: "",
      },
    };
  },
  methods: {
    submit() {
      if (this.isLogin) {
        this.login();
      } else {
        this.register();
      }
    },
    login() {
      this.$refs.form.validate((valid) => {
        //跳转到首页
        if (valid) {
          login(this.form).then(({ data }) => {
            if (data.code == 200) {
              this.$message.success("登录成功");
              this.$store.commit("setPermission", data.data.role);
              Cookie.set("token", data.data.token);
              Cookie.set("userId", data.data.userId);
              if (data.data.role == "user") {
                this.$router.push("/userHome");
              } else {
                this.$router.push("/");
              }
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    register() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          register(this.registerForm).then(({ data }) => {
            if (data.code == 200) {
              this.$message.success("注册成功");
              this.isLogin = true;
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  background: url("@/assets/images/nanjing.jpg") no-repeat center/cover;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.register {
  position: absolute;
  top: 0;
  right: 0;
  width: 52px;
  height: 52px;
  background: #46a2ff;
  color: #fff;
  border-radius: 0 0 0 52px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  .go-register {
    display: block;
    margin-top: 12px;
    margin-left: 10px;
    text-align: center;
  }
  &:hover {
    width: 72px;
    height: 72px;
    border-radius: 0 0 0 72px;
  }
}
.login-container {
  position: relative;
  width: 390px;
  margin: 0 auto;
  padding: 35px 35px 15px 35px;
  border: 0;
  border-radius: 10% 0 10% 0;
  background: rgba(231, 231, 231, 0.8);
  backdrop-filter: blur(6px); /* 背景模糊 */
  -webkit-backdrop-filter: blur(10px); /* Safari 支持 */
  .el-input {
    width: 190px;
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
