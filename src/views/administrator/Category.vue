<template>
  <div class="manage">
    <div class="manage-header">
      <el-button @click="handleAdd" type="primary" size="small">
        +新增
      </el-button>
      <!-- 搜索区域 -->
      <el-form :model="categoryForm" :inline="true" size="small">
        <el-form-item>
          <el-input placeholder="请输入分类名称" v-model="categoryForm.categoryName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" type="primary" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 分类表格 -->
    <div class="common-table">
      <el-table :data="categoryList" height="90%">
        <el-table-column prop="categoryId" label="序号"></el-table-column>
        <el-table-column prop="categoryName" label="分类名称"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="editCategory(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="deleteCategory(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination :page-size="10" :pager-count="7" layout="prev, pager, next" :total="total"
          :current-page.sync="currentPage" @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
    <!-- 添加/编辑分类弹窗 -->
    <el-dialog title="分类" :visible.sync="dialogVisible" width="50%" @closed="handleClose">
      <el-form :model="form" ref="form" label-width="80px" :rules="rules">
        <el-form-item label="分类名称" prop="categoryName">
          <el-input v-model="form.categoryName" placeholder="请输入分类名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
  getCategoryByName,
} from "@/api"; // 引入分类列表数据
export default {
  data() {
    return {
      dialogVisible: false, // 弹窗显示状态
      isSearch: false,
      searchName: "",
      currentPage: 1,
      categoryForm: {
        categoryName: "", // 分类id
      }, // 表单数据
      form: {
        categoryName: "",
      }, // 表单数据
      rules: {
        categoryName: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
      }, // 表单验证规则
      modalType: 0, //0表示新增，1表示编辑,
      page: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  computed: {
    // 从 Vuex 获取分类列表
    categoryList() {
      return this.$store.state.category.categoryList;
    },
    total() {
      return this.$store.state.category.total;
    },
  },
  methods: {
    //关闭弹窗
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    //新增按钮
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    // 关闭弹窗
    closeDialog() {
      this.dialogVisible = false;
    },
    //页面切换
    handlePage(val) {
      this.page.pageNum = val;
      // 如果是搜索状态，则调用搜索接口
      // 否则调用列表接口
      if (this.isSearch) {
        this.getListByName();
      } else {
        this.getCategoryList();
      }
    },
    // 提交表单
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modalType === 0) {
            addCategory(this.form).then((res) => {
              if (res.data && res.data.code == 200) {
                //添加成功，重新查询列表，并关闭弹窗
                this.getCategoryList();
                this.$message.success(res.data.msg);
                this.dialogVisible = false;
              } else if (res.code == 400) {
                // 否则提示错误，不关闭弹窗
                this.$message.error(res.msg);
              }
            });
          } else {
            updateCategory(this.form).then(({ data }) => {
              console.log(data);
              //重新查询
              this.getCategoryList();
              this.dialogVisible = false;
            });
          }
        }
      });
    },
    // 编辑分类
    editCategory(category) {
      this.modalType = 1;
      this.form = { ...category };
      this.dialogVisible = true;
    },
    // 删除分类
    deleteCategory({ categoryId }) {
      deleteCategory({ categoryId: categoryId }).then(({ data }) => {
        if (data.code == 200) {
          this.$message.success("删除成功");
          this.getCategoryList();
        }
      });
    },
    // 搜索分类
    getListByName() {
      getCategoryByName({ categoryName: this.searchName, ...this.page }).then(
        ({ data }) => {
          if (data.code == 200) {
            this.$store.commit("setCategoryList", data.data);
            this.$store.commit("setTotal", data.total);
          }
        }
      );
    },
    //列表搜索
    onSubmit() {
      // 先重置页码
      this.page.pageNum = 1;
      this.currentPage = 1;
      this.searchName = this.categoryForm.categoryName;
      // 进入搜索状态
      this.isSearch = true;
      this.getListByName();
    },
    //获取分类列表
    getCategoryList() {
      this.$store.dispatch("getCategoryList", this.page);
    },
  },
  mounted() {
    this.getCategoryList();
  },
  destroyed() {
    // 组件销毁时，重新获取分类列表，保持景点列表的分类数据保持最新
    this.getCategoryList();
  },
};
</script>

<style lang="less" scoped>
.dialog-footer {
  text-align: right;
}
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
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
