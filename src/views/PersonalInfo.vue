<template>
  <div class="personal-info" :style="{margin: $route.name == 'personalInfo' ? '40px auto' : '0'}">
    <h2 v-if="$route.name == 'personalInfo'">个人中心</h2>
    <h3 v-if="$route.name == 'personal'" style="margin-bottom: 20px;">个人中心</h3>
    <el-form v-if="userInfo" ref="form" :model="userInfo" :rules="rules" label-width="80px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userInfo.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="userInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input show-password type="password" v-model="userInfo.password"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-input v-model="displayRole" disabled></el-input>
      </el-form-item>
    </el-form>
    <el-button type="primary" :disabled="ismodify" @click="submit">保存</el-button>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { getUserById, updateUser } from "@/api";
export default {
  name: "PersonalInfo",
  data() {
    return {
      userId: Cookies.get("userId"),
      userInfo: null,
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],
        phone: [
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
      },
      ismodify: true,
    };
  },
  computed: {
    // 显示给用户看的角色
    displayRole: {
      get() {
        return this.userInfo.role === "user" ? "用户" : "管理员";
      },
    },
  },
  // 监听userInfo的变化
  watch: {
    userInfo: {
      // 新旧都存在时，说明进行了更改，显示保存按钮
      handler(newVal, oldVal) {
        if (newVal && oldVal) this.ismodify = false;
      },
      deep: true,
    },
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          updateUser(this.userInfo).then(({ data }) => {
            if (data.code == 200) {
              this.$message({
                message: "修改成功",
                type: "success",
              });
              this.ismodify = true;
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
  },
  created() {
    // 打印当前路由名称
    getUserById({ userId: this.userId }).then(({ data }) => {
      this.userInfo = data.data;
      console.log(this.userInfo);
    });
  },
};
</script>

<style lang="less" scoped>
.personal-info {
  padding: 20px;
  width: 50%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding-bottom: 60px;
  position: relative;
  .el-button {
    width: 200px;
    margin: 0 auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>