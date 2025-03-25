<template>
  <div class="best-path">
    <el-dialog :visible.sync="dialogVisible" width="60%" title="景点选择" @close="closeDialog">
      <el-table ref="ScenicTable" height="500" :data="tableData" style="width: 100%;"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <!-- 景点名称 -->
        <el-table-column prop="name" label="景点名称">
        </el-table-column>
        <!-- 地址 -->
        <el-table-column prop="address" label="地址">
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
        <!-- 图片 -->
        <el-table-column prop="image" label="图片">
          <template slot-scope="scope">
            <el-image style="width: 100px; height: 100px" :src="scope.row.image"
              fit="fill"></el-image>
          </template>
        </el-table-column>
      </el-table>
      <div class="pager">
        <el-pagination layout="prev, pager, next" :total="total" @current-change="handlePage">
        </el-pagination>
        <el-button @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <!-- 表单 选择起点 添加其它想去的景点 -->
    <div class="chooseScenic">
      <el-form label-width="80px">
        <el-form-item label="起点">
          <el-input v-model="startSpot.name" disabled>
            <el-button slot="append" icon="el-icon-plus" @click="dialogVisible=true"></el-button>
          </el-input>
        </el-form-item>
        <el-form-item label="途径景点" v-for="(item, index) in attractionList" :key="index">
          <el-input v-model="item.name" disabled>
            <el-button slot="append" icon="el-icon-plus" @click="openOther(index)"></el-button>
          </el-input>
        </el-form-item>
        <!-- 按钮，点击添加新的表单项 -->
        <el-button @click="addNewOption" style="width: 100%;"><i
            class="el-icon-plus"></i></el-button>
      </el-form>
      <el-button @click="getBestPath">获取最佳路径</el-button>
    </div>
    <el-steps>
      <el-step v-for="item in result" :key="item.attractionId" :title="item.name"></el-step>
    </el-steps>
  </div>
</template>

<script>
import Scenic from "../administrator/Scenic.vue";
import { getAttractionList, getGoodPath } from "@/api";
export default {
  name: "BestPath",
  components: {
    Scenic,
  },
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      // 选择的景点
      selection: [],
      attractionList: [
        {
          attractionId: "",
        },
      ],
      // 选择途经景点的index
      index: 0,
      flag: 0,
      // 起点
      startSpot: {
        name: "",
      },
      result: [],
      total: 0,
      page: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    // 关闭弹窗
    closeDialog() {
      this.selection = [];
      this.$refs.ScenicTable.clearSelection();
    },
    // 选择途经
    openOther(index) {
      this.index = index;
      this.flag = 1;
      this.dialogVisible = true;
    },
    //  选择景点
    handleSelectionChange(val) {
      this.selection = val;
    },
    // 确认选择
    confirm() {
      // 只能选一个景点,判断selection的长度
      if (this.selection.length > 1) {
        this.$message.error("只能选择一个景点");
        return;
      }
      if (this.flag == 0 && this.selection.length > 0) {
        this.startSpot = this.selection[0];
        this.flag = 1;
      } else if (this.flag == 1 && this.selection.length > 0) {
        this.attractionList[this.index] = this.selection[0];
      }
      this.dialogVisible = false;
    },
    // 获取最佳路径
    getBestPath() {
      let attractionIdList = [];
      this.attractionList.forEach((item) => {
        attractionIdList.push(item.attractionId);
      });
      console.log(attractionIdList);
      getGoodPath({
        start: this.startSpot.attractionId,
        attractionList: attractionIdList,
      }).then(({ data }) => {
        if (data.code == 200) {
          console.log(data.data);
          this.result = data.data;
        }
      });
    },
    addNewOption() {
      this.attractionList.push({
        attractionId: "",
      });
    },
    //页面切换
    handlePage(val) {
      this.page.pageNum = val;
      this.getList();
    },
    //获取列表数据方法的封装
    getList() {
      getAttractionList({ ...this.page }).then(({ data }) => {
        if (data.code == 200) {
          this.tableData = data.data;
          this.total = data.total;
        }
      });
    },
  },
  computed: {},
  mounted() {
    this.getList();
  },
};
</script>

<style scoped lang="less">
.best-path {
  width: 100%;
  height: 100%;
  .pager {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .chooseScenic {
    width: 500px;
    margin-top: 40px;
  }
  /* 设置文字省略 */
  .ellipsis {
    white-space: nowrap; /* 禁止换行 */
    overflow: hidden; /* 超出部分隐藏 */
    text-overflow: ellipsis; /* 使用省略号代替超出部分 */
    width: 100%; /* 设置宽度 */
  }
}
</style>