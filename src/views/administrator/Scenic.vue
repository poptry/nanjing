<template>
  <div class="manage">
    <el-dialog title="景点信息" :visible.sync="dialogVisible" width="50%" @closed="handleClose">
      <!-- 放表单信息 -->
      <el-form label-position="left" ref="form" :model="form" label-width="80px" :inline="true"
        :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="景点名称" prop="name">
              <el-input placeholder="请输入景点名称" v-model="form.name" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="地址" prop="address">
              <el-input placeholder="请输入地址" v-model="form.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="描述" prop="description">
              <el-input type="textarea" placeholder="请输入景点描述" v-model="form.description"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类别" prop="categoryId">
              <el-select v-model="form.categoryId" placeholder="请选择类别">
                <el-option v-for="item in categoryList" :key="item.categoryId"
                  :label="item.categoryName" :value="item.categoryId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <!-- 第三行，开放时间和票价 -->
          <el-col :span="12">
            <el-form-item label="开放时间" prop="openTime">
              <el-input placeholder="请输入开放时间" v-model="form.openTime"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="票价" prop="ticketPrice">
              <el-input placeholder="请输入票价" type="number" v-model="form.ticketPrice"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="form.status" placeholder="请选择状态">
                <el-option label="开启" value="1"></el-option>
                <el-option label="关闭" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经度" prop="longitude">
              <el-input placeholder="例如:30.423983" type="number"
                v-model="form.longitude"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- 第五行，纬度和经度 -->
          <el-col :span="12">
            <el-form-item label="纬度" prop="latitude">
              <el-input placeholder="例如:12.458123。" type="number"
                v-model="form.latitude"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <!--文件上传弹出框-->
            <el-form-item label="图片">
              <el-input placeholder="请输入内容" v-model="form.image" :disabled="true">
                <el-button @click="uploadvisible=true" slot="append"
                  icon="el-icon-plus"></el-button>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="uploadvisible" width="30%" title="上传图片">
      <ImgUpload @getURL="getImgURL"></ImgUpload>
    </el-dialog>
    <div class="manage-header">
      <el-button @click="handleAdd" type="primary" size="small">
        +新增
      </el-button>
      <!-- 搜索区域 -->
      <el-form :model="Attractionform" :inline="true" size="small">
        <el-form-item>
          <el-input placeholder="请输入景点名称" v-model="Attractionform.username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="onSubmit" type="primary" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 分类选择器-->
    <el-select v-model="categorySelect" placeholder="请选择" @change="changeSelect">
      <el-option v-for="item in categoryList" :key="item.categoryId" :label="item.categoryName"
        :value="item.categoryId">
      </el-option>
    </el-select>
    <div class="common-table">
      <el-table :data="tableData" height="90%">
        <!-- 景点ID -->
        <el-table-column prop="attractionId" label="景点ID" width="100">
        </el-table-column>

        <!-- 景点名称 -->
        <el-table-column prop="name" label="景点名称" width="100">
        </el-table-column>

        <!-- 景点描述 -->
        <el-table-column prop="description" label="景点描述" width="250">
          <template slot-scope="scope">
            <el-tooltip effect="light" placement="top" :content="scope.row.description"
              popper-class="custom-tooltip" :disabled="scope.row.description.length <= 13">
              <div class="ellipsis">
                {{ scope.row.description }}
              </div>
            </el-tooltip>
            <!-- 设置描述文本 -->
          </template>
        </el-table-column>

        <!-- 类别 -->
        <el-table-column prop="categoryName" label="类别" width="200">
        </el-table-column>

        <!-- 地址 -->
        <el-table-column prop="address" label="地址" width="200">
        </el-table-column>

        <!-- 票价 -->
        <el-table-column prop="ticketPrice" label="票价">
        </el-table-column>

        <!-- 创建时间 -->
        <el-table-column sortable prop="createTime" label="创建时间" width="200">
        </el-table-column>

        <!-- 状态 -->
        <el-table-column sortable prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 1" type="success">开启</el-tag>
            <el-tag v-else type="danger">关闭</el-tag>
          </template>
        </el-table-column>

        <!-- 开放时间 -->
        <el-table-column prop="openTime" label="开放时间" width="150">
        </el-table-column>

        <!-- 经度 -->
        <el-table-column prop="longitude" label="经度" width="150">
        </el-table-column>

        <!-- 纬度 -->
        <el-table-column prop="latitude" label="纬度" width="150">
        </el-table-column>

        <!-- 图片 -->
        <el-table-column prop="image" label="图片" width="150">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px" :src="scope.row.image"
              fit="fill"></el-image>
          </template>
        </el-table-column>

        <!-- 操作列 -->
        <el-table-column label="操作" width="210">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="warning" size="mini" @click="handleRemove(scope.row)">下架</el-button>
            <el-button type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import ImgUpload from "@/components/ImgUpload.vue";
import {
  getAttractionList,
  addAttraction,
  deleteAttraction,
  updateAttraction,
  removeAttraction,
} from "@/api";
export default {
  data() {
    return {
      dialogVisible: false,
      categorySelect: "",
      uploadvisible: false,
      form: {
        attractionId: "",
        name: "",
        description: "",
        categoryId: "",
        openTime: "",
        ticketPrice: "",
        address: "",
        status: "",
        latitude: "",
        longitude: "",
        image: "",
      },
      //搜索框
      Attractionform: {
        name: "",
      },
      //表单验证
      rules: {
        name: [{ required: true, message: "请输入景点名称", trigger: "blur" }],
        description: [
          { required: true, message: "请输入景点描述", trigger: "blur" },
        ],
        categoryId: [
          { required: true, message: "请选择类别", trigger: "change" },
        ],
        ticketPrice: [
          { required: true, message: "请输入票价", trigger: "blur" },
          {
            type: "number",
            message: "票价必须是数字",
            trigger: "blur",
            transform: (value) => Number(value),
          },
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
      },
      //列表数据
      tableData: [],
      modalType: 0, //0表示新增，1表示编辑,
      total: 0, //当前tableData的总条数
      page: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  components: {
    ImgUpload,
  },
  computed: {
    // 从 Vuex 获取分类列表
    categoryList() {
      if (this.$store.state.category.categoryList.length != 0) {
        return this.$store.state.category.categoryList;
      } else {
        this.$store.dispatch("getCategoryList", this.page);
      }
    },
  },
  methods: {
    // 下架
    handleRemove(row) {
      this.$confirm("是否删除该景点", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          removeAttraction({ attractionId: row.attractionId }).then(
            ({ data }) => {
              if (data.code == 200) {
                this.$message.success("下架成功");
                this.getList();
              } else {
                this.$message.error(data.msg);
              }
            }
          );
        })
        .catch(() => {
          return;
        });
    },
    // 设置父事件,接收弹窗上传的图片路径
    getImgURL(url) {
      this.form.image = url;
      this.uploadvisible = false;
    },
    //分类选项更换
    changeSelect() {
      this.getList();
    },
    //获取列表数据方法的封装
    getList() {
      getAttractionList({ categoryId: this.categorySelect, ...this.page }).then(
        ({ data }) => {
          if (data.code == 200) {
            this.tableData = data.data;
            this.total = data.total;
          }
        }
      );
    },
    //弹窗的确认事件 增加和编辑
    submit() {
      // 判断经纬度是否为空
      if (!this.form.longitude || !this.form.latitude) {
        this.$message.error("经纬度不能为空");
        return;
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.modalType == 0) {
            // 新增;
            addAttraction(this.form).then((res) => {
              if (res.data.code == 200) {
                this.$message.success("新增成功");
                this.handleClose();
                this.getList();
              } else {
                this.$message.error(res.data.msg);
              }
            });
          } else {
            //编辑
            updateAttraction(this.form).then(({ data }) => {
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
    //编辑
    handleEdit(row) {
      this.modalType = 1;
      this.dialogVisible = true;
      this.form = JSON.parse(JSON.stringify(row));
    },
    //关闭弹窗
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    //删除按钮
    handleDelete(row) {
      this.$confirm("是否删除该景点", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteAttraction({ attractionId: row.attractionId }).then(
            ({ data }) => {
              if (data.code == 200) {
                this.$message.success("删除成功");
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
    //新增按钮
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    //页面切换
    handlePage(val) {
      this.page.pageNum = val;
      this.getList();
    },
    //列表搜索
    onSubmit() {},
  },
  //获取列表数据
  mounted() {
    if (this.categoryList)
      this.categorySelect = this.categoryList[0].categoryId;
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
    justify-content: space-between;
    align-items: center;
  }
  .common-table {
    position: relative;
    // height: 90%;
    height: calc(100% - 62px);
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
</style>