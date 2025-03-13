<template>
  <div class="user-reservation">
    <el-dialog title="预定信息" :visible.sync="dialogVisible" width="55%" @closed="handleClose">
      <!-- 放表单信息 -->
      <el-form label-position="left" ref="form" :model="form" label-width="80px" :inline="true"
        :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="景点" prop="attractionName">
              <el-input disabled placeholder="请输入景点" v-model="form.attractionName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户ID" prop="userId">
              <el-input disabled placeholder="请输入用户ID" v-model="form.userId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option label="已预定" value="1"></el-option>
                <el-option label="已取消" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预定日期" prop="visitDate">
              <el-date-picker v-model="form.visitDate" type="date" placeholder="请选择预定日期"
                value-format="yyyy-MM-dd" style="width: 100%"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="人数" prop="numPeople">
              <el-input-number v-model="form.numPeople" :min="1" :max="10" :precision="0"
                label="请输入人数"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <div class="return">
      <router-link to="/userHome" class="backLink">返回</router-link>
    </div>
    <div class="title">
      我的预约
    </div>
    <span style="color: #a3a3a3;font-size: 12px;">预约时间过期后将无法操作</span>
    <el-divider></el-divider>
    <div class="common-table">
      <el-table :data="tableData" height="90%" style="width: 100%">
        <el-table-column prop="attractionName" label="景点"></el-table-column>
        <el-table-column prop="numPeople" label="预约人数"></el-table-column>
        <el-table-column prop="visitDate" label="预约时间" sortable></el-table-column>
        <el-table-column prop="status" label="预约状态" sortable>
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === '1' ? 'success' : 'danger'">
              {{ scope.row.status == '1' ? "已预约" : "已取消" }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" sortable></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button :disabled="new Date(scope.row.visitDate) < new Date(currentTime)" size="mini"
              @click="editReservation(scope.row)">编辑</el-button>
            <el-button :disabled="new Date(scope.row.visitDate) < new Date(currentTime)"
              type="danger" size="mini" @click="cancel(scope.row)">取消预约</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination :page-size="10" :pager-count="7" layout="prev, pager, next" :total="total"
          @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import { deleteReservation } from "@/api"; // 导入API请求
import { getListByUserId, updateReservation } from "@/api";
export default {
  name: "UserReservation",
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      currentTime: new Date().toISOString().split("T")[0],
      total: 0,
      userId: 0,
      form: {
        userId: "",
        attractionId: "",
        visitDate: "",
        numPeople: "",
        status: "",
      },
      rules: {
        reservationId: [
          { required: true, message: "请输入预定ID", trigger: "blur" },
        ],
        userId: [{ required: true, message: "请输入用户ID", trigger: "blur" }],
        attractionId: [
          { required: true, message: "请输入景点ID", trigger: "blur" },
        ],
        visitDate: [
          { required: true, message: "请选择预定日期", trigger: "change" },
        ],
        numPeople: [
          { required: true, message: "请输入人数", trigger: "blur" },
          {
            type: "number",
            message: "人数必须是数字",
            trigger: "blur",
            transform: (value) => Number(value),
          },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
      page: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    //页面切换
    handlePage(val) {
      this.page.pageNum = val;
      this.getList();
    },
    // 编辑
    editReservation(data) {
      this.form = { ...data };
      this.dialogVisible = true;
    },
    // 清空表单
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 编辑
          updateReservation(this.form).then(({ data }) => {
            if (data.code == 200) {
              this.$message.success(data.msg);
              this.handleClose();
              this.getList();
            } else {
              this.$message.error(data.msg);
            }
          });
        }
      });
    },
    cancel(row) {
      this.$confirm("是否取消该预定", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteReservation({ reservationId: row.reservationId }).then(
            ({ data }) => {
              if (data.code == 200) {
                this.$message.success("取消成功");
                this.getList();
              } else {
                this.$message.error(data.msg);
              }
            }
          );
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },
    // 获取用户的预约列表
    getList() {
      getListByUserId({ userId: this.userId, ...this.page }).then(
        ({ data }) => {
          this.total = data.total;
          this.tableData = data.data;
          console.log(this.tableData);
        }
      );
    },
  },
  mounted() {
    this.userId = Cookies.get("userId");
    this.getList();
  },
};
</script>

<style scoped lang="less">
.user-reservation {
  padding: 40px;
  height: 100%;
  .return {
    .backLink {
      text-decoration: none;
      color: black;
    }
  }
  .title {
    font-size: 24px;
    color: rgb(37, 37, 37);
    width: 100px;
    font-weight: 500;
    margin: 0 auto;
  }
  .common-table {
    position: relative;
    padding-bottom: 30px;
    height: calc(100% - 62px);
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>