<template>
  <div class="manage">
    <el-dialog title="留言信息" :visible.sync="dialogVisible" width="50%" @closed="handleClose">
      <!-- 放表单信息 -->
      <el-form label-position="left" ref="form" :model="form" label-width="80px" :inline="true"
        :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="留言ID" prop="commentId">
              <el-input disabled v-model="form.commentId" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户" prop="userName">
              <el-input disabled v-model="form.userName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="景点" prop="attractionName">
              <el-input disabled v-model="form.attractionName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="评分" prop="rating">
              <el-rate v-model="form.rating" disabled style="margin-top: 5px;"></el-rate>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="留言内容" prop="content">
              <el-input type="textarea" disabled v-model="form.content"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option label="审核通过" :value="1"></el-option>
                <el-option label="待审核" :value="0"></el-option>
                <el-option label="已拒绝" :value="9"></el-option>
              </el-select>
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
      <el-form :model="Commentform" :inline="true" size="small">
        <el-form-item>
          <el-input placeholder="请输入留言内容" v-model="Commentform.commentId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" type="primary" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="common-table">
      <el-table :data="tableData" height="90%">
        <!-- 留言ID -->
        <el-table-column prop="commentId" label="留言ID" width="80"></el-table-column>

        <!-- 用户ID -->
        <el-table-column prop="userName" label="用户" width="100"></el-table-column>

        <!-- 景点ID -->
        <el-table-column prop="attractionName" label="景点"></el-table-column>

        <!-- 评分 -->
        <el-table-column prop="rating" label="评分" sortable>
          <template slot-scope="scope">
            <el-rate v-model="scope.row.rating" disabled></el-rate>
          </template>
        </el-table-column>

        <!-- 留言内容 -->
        <el-table-column prop="content" label="留言内容" width="250">
          <template slot-scope="scope">
            <el-tooltip effect="light" placement="top" :content="scope.row.content"
              popper-class="custom-tooltip">
              <div class="ellipsis">
                {{ scope.row.content }}
              </div>
            </el-tooltip>
            <!-- 设置描述文本 -->
          </template>
        </el-table-column>

        <!-- 状态 -->
        <el-table-column prop="status" label="状态" sortable>
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 0" type="info">待审核</el-tag>
            <el-tag v-else-if="scope.row.status == 1" type="success">审核通过</el-tag>
            <el-tag v-else-if="scope.row.status == 9" type="danger">已拒绝</el-tag>
          </template>
        </el-table-column>

        <!-- 创建时间 -->
        <el-table-column prop="createTime" sortable label="创建时间" width="200"></el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">审核</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">拒绝</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pager">
        <el-pagination layout="prev, pager, next" :total="total" :current-page.sync="currentPage"
          @current-change="handlePage"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCommentList,
  addComment,
  deleteComment,
  updateComment,
  getCommentListByContent,
} from "@/api"; // 导入API请求
export default {
  data() {
    return {
      dialogVisible: false,
      isSearch: false,
      searchContent: "",
      currentPage: 1,
      form: {
        commentId: "",
        userName: "",
        attractionId: "",
        content: "",
        rating: 0,
        status: "",
        attractionName: "",
      },
      Commentform: {
        commentId: "",
      },
      rules: {
        commentId: [
          { required: true, message: "请输入留言ID", trigger: "blur" },
        ],
        userId: [{ required: true, message: "请输入用户ID", trigger: "blur" }],
        attractionId: [
          { required: true, message: "请输入景点ID", trigger: "blur" },
        ],
        content: [
          { required: true, message: "请输入留言内容", trigger: "blur" },
        ],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
      tableData: [],
      modalType: 0, // 0表示新增，1表示编辑
      total: 0, // 当前tableData的总条数
      page: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    handleEdit(row) {
      this.modalType = 1;
      this.dialogVisible = true;
      this.form = { ...JSON.parse(JSON.stringify(row)) };
    },
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modalType === 0) {
            // 新增
            addComment(this.form).then(({ data }) => {
              if (data.code == 200) {
                this.$message.success("新增成功");
                this.handleClose();
                this.getList();
              }
            });
          } else {
            // 编辑
            updateComment(this.form).then(({ data }) => {
              if (data.code == 200) {
                this.$message.success(data.msg);
                this.handleClose();
                this.getList();
              } else {
                this.$message.error(data.msg);
              }
            });
          }
        }
      });
    },
    handleDelete(row) {
      this.$confirm("是否删除该留言", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteComment({ commentId: row.commentId }).then(({ data }) => {
            if (data.code == 200) {
              this.$message.success("拒绝成功");
              this.getList();
            } else {
              this.$message.error(data.msg);
            }
          });
        })
        .catch(() => {});
    },
    handlePage(val) {
      this.page.pageNum = val;
      if (this.isSearch) {
        this.getListByContent();
      } else {
        this.getList();
      }
    },
    getListByContent() {
      getCommentListByContent({
        content: this.searchContent,
        ...this.page,
      }).then(({ data }) => {
        console.log(data);
        if (data.code == 200) {
          let array = data.data.records;
          array.forEach((element) => {
            element.rating = Number(element.rating);
          });
          this.tableData = array;
          this.total = data.data.total;
        } else {
          this.$message.error(data.msg);
        }
      });
    },
    onSubmit() {
      // 先重置页码
      this.page.pageNum = 1;
      this.currentPage = 1;
      this.searchContent = this.Commentform.commentId;
      // 进入搜索状态
      this.isSearch = true;
      // 调用搜索接口
      this.getListByContent();
    },
    getList() {
      console.log("列表");
      getCommentList({ ...this.page }).then(({ data }) => {
        if (data.code == 200) {
          let array = data.data.records;
          array.forEach((element) => {
            element.rating = Number(element.rating);
          });
          this.tableData = array;
          this.total = data.data.total;
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
  ::v-deep .el-input--suffix .el-input__inner {
    padding: 15px;
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
}
</style>
