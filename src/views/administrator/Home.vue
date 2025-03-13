<template>
  <div class="home">
    <div class="top">
      <h1 class="dataTitle">数据总览</h1>
      <div class="card" v-for="item in data" :style="{background:item.color}">
        <span class="icon">
          <i :class="`el-icon-${item.icon}`"></i>
        </span>
        <div class="right">
          <div class="num">{{ item.num }}</div>
          <div class="title">
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="middle">
      <!-- 预约人数表 -->
      <div class="chart">
        <h1>预定信息</h1>
        <div id="chart" class="grahp">
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="newestComm">
        <h1>最新评论</h1>
        <div class="commentList">
          <el-table :data="comments" style="width: 100%">
            <el-table-column label="景点" prop="attractionName">
            </el-table-column>
            <el-table-column label="评论内容" prop="content">
            </el-table-column>
            <el-table-column label="评分" prop="rating">
            </el-table-column>
            <el-table-column label="用户名称" prop="userName">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import {
  getUserCount,
  getCommentCount,
  getReservationCount,
  getAttractionCount,
  getGraphInfo,
  getCommentGraphInfo,
} from "@/api";
export default {
  data() {
    return {
      data: [
        {
          name: "用户数量",
          num: 0,
          icon: "user",
          color:
            "linear-gradient(90deg, rgb(120, 139, 247), rgb(46, 208, 252))",
        },
        {
          name: "景点数量",
          num: 0,
          icon: "s-flag",
          color: "linear-gradient(90deg, rgb(254, 129, 129), rgb(255, 93, 93))",
        },
        {
          name: "预定人次",
          num: 0,
          icon: "thumb",
          color:
            "linear-gradient(90deg, rgb(103, 204, 222), rgb(98, 228, 156))",
        },
        {
          name: "留言总数",
          num: 0,
          icon: "chat-line-square",
        },
      ],
      comments: [],
      myChart: null,
    };
  },
  computed: {},
  methods: {
    // 初始化图表
    async initChart() {
      let graphData = null;
      // 获取图表数据
      await getGraphInfo().then(({ data }) => {
        graphData = data.data;
      });
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById("chart"));
      let option = {
        tooltip: {
          trigger: "axis",
        },
        dataset: {
          source: graphData,
        },
        legend: {
          data: ["预约人数", "取消预约人数"],
        },
        xAxis: {
          type: "category",
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "预约人数",
            type: "line",
            stack: "Total",
            color: ["#0C9CEB", "#E8772E"],
            smooth: true,
            encode: { y: "reservated" }, // 从 dataset 取数据
          },
          {
            name: "取消预约人数",
            type: "line",
            stack: "Total",
            color: ["#E8772E", "#0C9CEB", "#7289ab", "#91ca8c", "#f49f42"],
            smooth: true,
            encode: { y: "cancleReservated" }, // 从 dataset 取数据
          },
        ],
      };
      // 绘制图表
      option && this.myChart.setOption(option);
    },
    // 获取数量
    async getCountList() {
      await getUserCount().then(({ data }) => {
        this.data[0].num = data.data.map.user;
      });
      await getCommentCount().then(({ data }) => {
        this.data[3].num = data.data.map.comment;
      });
      await getReservationCount().then(({ data }) => {
        this.data[1].num = data.data.map.reservation;
      });
      await getAttractionCount().then(({ data }) => {
        this.data[2].num = data.data.map.attraction;
      });
    },
    // 获取最新评论
    async getNewComments() {
      getCommentGraphInfo().then(({ data }) => {
        this.comments = data.data;
      });
    },
  },
  mounted() {
    this.getCountList();
    this.getNewComments();
    this.initChart();
  },
  beforeDestroy() {},
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  padding: 10px 20px;
}
.middle {
  width: 100%;
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  .newestComm,
  .chart {
    width: 50%;
    padding: 0 20px;
    box-shadow: 0 0 5px 0 rgb(215, 215, 215);
  }
  .grahp {
    width: 100%;
    height: 300px;
  }
  .newestComm {
    width: 48%;
  }
}
.top {
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 20px;
  padding-top: 60px;
  box-shadow: 0 0 5px 0 rgb(215, 215, 215);
  .dataTitle {
    position: absolute;
    top: 0;
  }
}

/* From Uiverse.io by EmmaxPlay */
.card {
  width: 200px;
  height: 80px;
  margin-right: 25px;
  box-shadow: 0px 0px 5px rgb(151, 151, 151);
  border-radius: 8px;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  background: linear-gradient(90deg, rgb(175, 122, 246), rgb(249, 93, 153));
  .icon {
    font-size: 45px;
    color: #ffffff;
  }
  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .num {
    font-size: 20px;
    font-weight: 700;
    color: #e6e6e6;
  }
  .title {
    font-size: 14px;
    font-weight: 600;
    font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    color: #e6e6e6;
  }
}
</style>