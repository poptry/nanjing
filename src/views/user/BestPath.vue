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
          <div class="flexBox">
            <el-input style="width: 80%;" v-model="startSpot.name" disabled>
              <el-button slot="append" icon="el-icon-plus" @click="openStart"></el-button>
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="途径景点" v-for="(item, index) in attractionList" :key="index">
          <div class="flexBox">
            <el-input style="width: 80%;" v-model="item.name" disabled>
              <el-button slot="append" icon="el-icon-plus" @click="openOther(index)"></el-button>
            </el-input>
            <el-button v-if="index!=0" style="margin-left: 20px;" type="danger" icon="el-icon-minus"
              circle @click="remove(index)"></el-button>
          </div>
        </el-form-item>
        <!-- 按钮，点击添加新的表单项 -->
        <el-button class="addNewItem" @click="addNewOption" style="width: 100%;"><i
            class="el-icon-plus"></i></el-button>
      </el-form>
      <el-button class="getPath" @click="getBestPath" type="primary">获取最佳路径</el-button>
    </div>
    <el-timeline>
      <el-timeline-item v-for="item in result" :key="item.attractionId" timestamp=""
        placement="top">
        <el-card class="box-card">
          <img :src="item.image"
            style="display: block; object-fit: cover; width: 150px; height: 150px;" alt="未加载" />
          <div class="description">
            <el-descriptions title="景点介绍" :column="1">
              <el-descriptions-item
                label="名称">{{ item.name ? item.name : "--" }}</el-descriptions-item>
              <el-descriptions-item
                label="地址">{{ item.address ? item.address : "--" }}</el-descriptions-item>
              <el-descriptions-item label="描述">
                <div style="width: 250px;">
                  <el-tooltip effect="light" placement="top" :content="item.description"
                    popper-class="custom-tooltip">
                    <p class="ellipsis">
                      {{ item.description ? item.description : "--" }}
                    </p>
                  </el-tooltip>
                </div>
              </el-descriptions-item>
              <el-descriptions-item label="开放时间">
                {{ item.openTime ? item.openTime : '--' }}
              </el-descriptions-item>
              <el-descriptions-item label="开放状态">
                <el-tag size="small"
                  :type="item.status == 0 ? 'danger' :''">{{ item.status == 0 ? '关闭' : "开启" }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item
                label="票价">{{ item.ticketPrice ? item.ticketPrice : '--'  }}</el-descriptions-item>
            </el-descriptions>
          </div>
          <el-button type="primary" icon="el-icon-s-promotion" circle plain style="height: 60px;">
            <router-link style="text-decoration: none;"
              :to="{ name: 'attraction', params: { scenicData: JSON.stringify(item) } }"
              target="_blank">更多</router-link>
          </el-button>
        </el-card>
      </el-timeline-item>
    </el-timeline>
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
      index: -1,
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
    // 点击卡片,前往详细页面
    handleClick(item) {
      // 跳转到景点详情页面，打开新的标签页
      // this.$router.push({
      //   name: "attraction",
      //   params: { scenicData: JSON.stringify(item) },
      // });
    },
    // 打开起点
    openStart() {
      this.flag = 0;
      this.dialogVisible = true;
    },
    // 移除
    remove(index) {
      console.log(index);
      this.attractionList.splice(index, 1);
      console.log(this.attractionList);
    },
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
        console.log(this.attractionList);
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
          this.result = data.data;
        } else if (data.code == 400) {
          this.$message.error(data.msg);
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
.box-card {
  width: 50%;
  ::v-deep .el-card__body {
    display: flex;
    flex-direction: row;
  }
  .description {
    margin-left: 20px;
  }
}
.flexBox {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.best-path {
  width: 100%;
  height: 100%;
  .pager {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }
  .chooseScenic {
    margin: 20px;
    width: 600px;
    padding: 40px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    .addNewItem {
      margin-bottom: 20px;
      border: 0;
      padding: 10px 20px;
      i {
        font-size: 24px;
      }
    }
    .getPath {
      display: block;
      width: 200px;
      margin: 0 auto;
    }
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