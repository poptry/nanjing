<template>
  <div class="scenicDialog">
    <div class="top-part">
      <div class="img">
        <el-image style="width: 200px; height: 200px" :src="newData.image" fit="fill"></el-image>
      </div>
      <div class="description">
        <el-descriptions title="景点介绍" :column="1">
          <el-descriptions-item
            label="名称">{{ newData.name ? newData.name : "--" }}</el-descriptions-item>
          <el-descriptions-item
            label="地址">{{ newData.address ? newData.address : "--" }}</el-descriptions-item>
          <el-descriptions-item label="描述">
            <p class="ellipsis">{{ newData.description ? newData.description : "--" }}</p>
          </el-descriptions-item>
          <el-descriptions-item label="开放状态">
            <el-tag size="small"
              :type="newData.status == 0 ? 'danger' :''">{{ newData.status == 0 ? '关闭' : "开启" }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item
            label="票价">{{ newData.ticketPrice ? newData.ticketPrice : '--'  }}</el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="reservation">
      <el-form label-position="right" ref="form" :rules="rules" :model="reservationForm"
        label-width="80px" inline>
        <el-form-item label="预定日期" prop="visitDate">
          <el-date-picker v-model="reservationForm.visitDate" type="date" placeholder="请选择预定日期"
            value-format="yyyy-MM-dd" style="width: 100%"></el-date-picker>
        </el-form-item>
        <el-form-item label="人数" prop="numPeople">
          <el-input-number v-model="reservationForm.numPeople" :min="1" :max="10"
            label="请输入人数"></el-input-number>
        </el-form-item>
      </el-form>
      <el-button class="submit" type="primary" @click="submitReservation">立即预定</el-button>
    </div>
    <el-divider></el-divider>
    <div class="bottom-part">
      <span
        style="display: block; font-size: 16px; color: black;font-weight: 600;margin:15px 0;">留言板
      </span>
      <el-rate v-model="commentForm.rating"></el-rate>
      <!-- 留言输入框 -->
      <el-row :gutter="20">
        <el-col :span="18">
          <el-input type="textarea" v-model="commentForm.content" placeholder="请输入留言" rows="3"
            resize="none" maxlength="120" show-word-limit clearable></el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="submitMessage" :disabled="!commentForm.content">
            提交留言
          </el-button>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <!-- 留言展示区域 -->
      <el-card v-if="comments.length === 0" class="empty-message">
        <p>暂无留言。</p>
      </el-card>
      <div class="commentArea">
        <div v-for="item in comments" :key="item.commentId" class="commentBoard">
          <div class="user">
            <span class="username">{{ item.userName }}</span>
            <span class="commentTime">{{ item.createTime }}</span>
          </div>
          <el-rate v-model="item.rating" disabled style="margin-top: 5px;"></el-rate>
          <div class="commentContent">{{ item.content }}</div>
          <el-divider></el-divider>
        </div>
        <div class="pager">
          <el-pagination :page-size="10" :pager-count="7" layout="prev, pager, next" :total="total"
            @current-change="handlePage">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import {
  getCommentList,
  addReservation,
  addComment,
  getCommentsByAttraction,
} from "@/api";
export default {
  name: "ScenicDialog",
  data() {
    return {
      message: "",
      newData: [],
      rules: {
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
      },
      reservationForm: {
        userId: 0,
        attractionId: "",
        visitDate: "",
        numPeople: "",
        status: 1,
      },
      commentForm: {
        userId: 0,
        attractionId: "",
        content: "",
        rating: 0,
        status: 0,
      },
      total: 0,
      comments: [],
      page: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    // 预定
    submitReservation() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          addReservation(this.reservationForm).then(({ data }) => {
            if (data.code == 200) {
              this.$message.success("预定成功");
            }
          });
        }
      });
    },
    //页面切换
    handlePage(val) {
      this.page.pageNum = val;
    },
    // 提交评论
    submitMessage() {
      addComment(this.commentForm).then(({ data }) => {
        if (data.code == 200) {
          this.$message.success("评论成功,等待审核");
        }
      });
    },
    // 查询评论列表
    getComments() {
      getCommentsByAttraction(this.commentForm).then(({ data }) => {
        console.log(data.data.records);
        const array = data.data.records;
        array.forEach((element) => {
          element.rating = Number(element.rating);
        });
        this.comments = array;
      });
    },
  },
  created() {
    this.newData = JSON.parse(this.$route.params.scenicData);
    this.commentForm.attractionId = this.reservationForm.attractionId =
      this.newData.attractionId;
    // 获取参数
    this.getComments();
    this.commentForm.userId = this.reservationForm.userId = Number(
      Cookies.get("userId")
    );
    console.log(this.reservationForm);

    getCommentList(this.page).then((res) => {
      console.log(res);
    });
  },
};
</script>

<style lang="less" scoped>
.scenicDialog {
  padding: 40px;
}
.top-part {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  .img {
    padding: 5px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(57, 56, 56, 0.3) 0px 7px 13px -3px;
  }
  .description {
    margin-left: 20px;
  }
  .ellipsis {
    display: -webkit-box;
    -webkit-line-clamp: 3; /* 限制最多显示 3 行 */
    -webkit-box-orient: vertical; /* 设置文本为垂直排列 */
    overflow: hidden; /* 隐藏超出部分 */
    text-overflow: ellipsis; /* 显示省略号 */
    width: 200px; /* 宽度，可以根据需要调整 */
    height: auto;
    color: rgb(26, 26, 26);
  }
}
.reservation {
  position: relative;
  padding: 0 20px;
  padding-bottom: 30px;
  width: 80%;
  margin: 0 auto;
  .submit {
    position: absolute;
    right: 45px;
  }
}
.bottom-part {
  width: 1000px;
  margin: 0 auto;
  .message-board {
    width: 60%;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
  }
  h1 {
    text-align: center;
  }
  .el-input,
  .el-button {
    margin-bottom: 20px;
  }
  .empty-message {
    text-align: center;
    color: #999;
    margin-bottom: 20px;
  }
  .user {
    .username {
      font-size: 16px;
      color: black;
    }
    .commentTime {
      display: inline-block;
      font-size: 12px;
      color: #aaaaaa;
      margin-left: 20px;
    }
  }
  .commentContent {
    font-size: 14px;
    margin-top: 10px;
    color: #636161;
  }
  .commentBoard {
    padding: 0 20px;
  }
  .commentArea {
    position: relative;
    padding-bottom: 25px;
    .pager {
      position: absolute;
      right: 0;
      bottom: 0;
    }
  }
}
</style>