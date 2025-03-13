<template>
  <div class="user-management">
    <!-- 弹窗：新增和编辑用户 -->
    <el-dialog title="用户信息" :visible.sync="dialogVisible" width="50%" @closed="handleClose">
      <el-form label-position="left" ref="form" :model="form" label-width="75px" :inline="true"
        :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名" prop="username">
              <el-input placeholder="请输入用户名" v-model="form.username" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input placeholder="请输入邮箱" v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input placeholder="请输入手机号" v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色" prop="role">
              <el-select v-model="form.role" placeholder="请选择角色">
                <el-option label="管理员" value="admin"></el-option>
                <el-option label="普通用户" value="user"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="密码" prop="password">
              <el-input placeholder="请输入密码" v-model="form.password" type="password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 用户管理区域 -->
    <div class="manage-header">
      <!-- <el-button @click="handleAdd" type="primary" size="small">
        +新增
      </el-button> -->
      <!-- 用户搜索区域 -->
      <el-form :model="userForm" :inline="true" size="small">
        <el-form-item>
          <el-input placeholder="请输入用户名" v-model="userForm.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" type="primary" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="common-table">
      <el-table :data="tableData" height="90%">
        <el-table-column prop="userId" label="用户ID" width="80"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="role" label="角色">
          <template slot-scope="scope">
            <span>{{ scope.row.role == "admin" ? "管理员" : "普通用户" }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" sortable label="创建时间" width="180"></el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pager">
        <el-pagination layout="prev, pager, next" :total="total"
          @current-change="handlePage"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserList, deleteUser, updateUser } from "@/api";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        userId: "",
        username: "",
        password: "",
        role: "",
        email: "",
        phone: "",
      },
      userForm: {
        username: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "邮箱格式不正确", trigger: "blur" },
        ],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不正确",
            trigger: "blur",
          },
        ],
        role: [{ required: true, message: "请选择角色", trigger: "change" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
      tableData: [],
      // modalType: 0,
      total: 0, // 当前tableData的总条数
      page: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    // 添加用户
    // handleAdd() {
    // this.modalType = 0;
    // this.dialogVisible = true;
    // },
    handleEdit(row) {
      // this.modalType = 1;
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    handleDelete(row) {
      this.$confirm("是否删除该用户", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteUser({ userId: row.userId }).then(({ data }) => {
          if (data.code == 200) {
            this.$message.success("删除成功");
            this.getList();
          } else {
            this.$message.error(data.msg);
          }
        });
      });
    },

    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 编辑用户
          updateUser(this.form).then(({ data }) => {
            if (data.code == 200) {
              this.$message.success("更新成功");
              this.handleClose();
              this.getList();
            } else {
              this.$message.error(data.msg);
            }
          });
          // if (this.modalType === 0) {
          //   // 新增
          //   addReservation(this.form).then(({ data }) => {
          //     if (data.code == 200) {
          //       this.$message.success("新增成功");
          //       this.handleClose();
          //       this.getList();
          //     }
          //   });
          // } else {
          //   // 编辑
          // }
        }
      });
    },
    handleClose() {
      this.dialogVisible = false;
      this.$refs.form.resetFields();
    },
    getList() {
      getUserList({ ...this.page }).then(({ data }) => {
        if (data.code == 200) {
          this.tableData = data.data;
          this.total = data.total;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    onSubmit() {
      this.getList();
    },
    handlePage(val) {
      this.page.pageNum = val;
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.user-management {
  height: 90%;
  ::v-deep .el-input--suffix .el-input__inner {
    padding: 15px;
  }
}
.manage-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.common-table {
  position: relative;
  height: calc(100% - 62px);
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>
