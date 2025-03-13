<template>
  <div class="manage">
    <el-dialog title="预定信息" :visible.sync="dialogVisible" width="55%" @closed="handleClose">
      <!-- 放表单信息 -->
      <el-form label-position="left" ref="form" :model="form" label-width="80px" :inline="true"
        :rules="rules">
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
            <el-form-item label="用户ID" prop="userId">
              <el-input disabled placeholder="请输入用户ID" v-model="form.userId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="景点" prop="attractionName">
              <el-input placeholder="请输入景点" v-model="form.attractionName"></el-input>
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

    <div class="manage-header">
      <!-- 搜索区域 -->
      <el-form :model="Reservationform" :inline="true" size="small">
        <el-form-item>
          <el-input placeholder="请输入用户名称" v-model="Reservationform.reservationId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" type="primary" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="common-table">
      <el-table :data="tableData" height="90%">
        <!-- 预定ID -->
        <el-table-column prop="reservationId" label="预定ID" width="100"></el-table-column>

        <!-- 用户ID -->
        <el-table-column prop="userId" label="用户ID" width="100"></el-table-column>

        <!-- 景点ID -->
        <el-table-column prop="attractionName" label="景点"></el-table-column>

        <!-- 预定日期 -->
        <el-table-column prop="visitDate" label="预定日期" sortable></el-table-column>

        <!-- 人数 -->
        <el-table-column prop="numPeople" label="人数"></el-table-column>

        <!-- 状态 -->
        <el-table-column prop="status" label="状态" sortable>
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 1" type="success">已预定</el-tag>
            <el-tag v-else type="danger">已取消</el-tag>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">取消预定</el-button>
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
import {
  getReservationList,
  deleteReservation,
  updateReservation,
} from "@/api"; // 导入API请求
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        userId: "",
        attractionId: "",
        visitDate: "",
        numPeople: "",
        status: "",
      },
      Reservationform: {
        reservationId: "",
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
      tableData: [],
      total: 0, // 当前tableData的总条数
      page: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    handleAdd() {
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
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
    handleDelete(row) {
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
    handlePage(val) {
      this.page.pageNum = val;
      this.getList();
    },
    onSubmit() {
      this.getList();
    },
    getList() {
      getReservationList({ ...this.page }).then(({ data }) => {
        console.log(data.data);
        if (data.code == 200) {
          this.tableData = data.data;
          this.total = data.total;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
/* 设置文字省略 */
.ellipsis {
  white-space: nowrap; /* 禁止换行 */
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 使用省略号代替超出部分 */
  width: 100%; /* 设置宽度 */
}
.manage {
  height: 90%;
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
}
</style>
