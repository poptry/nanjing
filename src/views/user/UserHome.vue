<template>
  <div class="user-home">
    <!-- 搜索 -->
    <div class="search">
      <div class="searchPart">
        <input class="searchInput" v-model="searchValue" name="text" type="text"
          placeholder="输入景点名称搜索" />
        <el-button @click="search">搜索</el-button>
      </div>
    </div>
    <!-- 景点分类和展示 -->
    <div class="w recommendScenic">
      <!-- 分类 -->
      <div style="margin-bottom: 20px;">
        <span style="font-size: 20px;font-weight: 600;">景点分类</span>
      </div>
      <div class="cate-card">
        <CategoryCard :class="firstId == 0 ? 'whichCategory' : ``" :categoryData="all"
          @clickCategory="clickCategory">
        </CategoryCard>
        <CategoryCard v-for="item in categoryList" :key="item.categoryId" :categoryData="item"
          :class="item.categoryId==firstId ? 'whichCategory' : ``" @clickCategory="clickCategory">
        </CategoryCard>
      </div>
      <div style="margin-bottom: 20px;">
        <span style="font-size: 20px;font-weight: 600;">景点</span>
      </div>
      <div class="scenicCard">
        <CommonCard v-for="item in scenicList" :key="item.attractionId" :scenicData="item"
          @scenicClick="clickScenic">
        </CommonCard>
        <div class="pager">
          <el-pagination @size-change="handleSizeChange" layout="sizes,prev, pager, next"
            :total="total" :page-sizes="[10, 20, 30, 40]"
            @current-change="handlePage"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonCard from "@/components/CommonCard";
import CommonHeader from "../../components/CommonHeader.vue";
import CategoryCard from "@/components/CategoryCard.vue";
import ScenicDialog from "@/components/ScenicDialog.vue";
import { getCategoryList, searchAttraction, getAttractionList } from "@/api";
export default {
  name: "UserHome",
  components: {
    CommonCard,
    CommonHeader,
    CategoryCard,
    ScenicDialog,
  },
  data() {
    return {
      searchValue: "",
      all: {
        categoryName: `全部`,
      },
      recommendList: [],
      categoryList: [],
      scenicList: [],
      firstId: 0,
      total: 0,
      page: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    // 搜索
    search() {
      console.log(this.searchValue);
      searchAttraction({ name: this.searchValue }).then(({ data }) => {
        this.scenicList = data.data;
        this.total = data.total;
      });
    },
    // 显示个数切换
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.getScenicList();
    },
    //页面切换
    handlePage(val) {
      this.page.pageNum = val;
      this.getScenicList();
    },
    // 点击分类
    clickCategory(category) {
      this.page = {
        pageNum: 1,
        pageSize: 10,
      };
      this.firstId = category.categoryId ? category.categoryId : 0;
      this.getScenicList();
    },
    // 点击景点
    clickScenic(scenicData) {
      this.$router.push({
        name: "attraction",
        params: { scenicData: JSON.stringify(scenicData) },
      });
    },
    // 获取景点
    async getScenicList() {
      if (this.firstId == 0) {
        await getAttractionList(this.page).then(({ data }) => {
          this.total = data.total;
          this.scenicList = data.data;
        });
        return;
      }
      await getAttractionList({
        attractionName: this.searchValue,
        categoryId: this.firstId,
        ...this.page,
      }).then(({ data }) => {
        this.total = data.total;
        this.scenicList = data.data;
      });
    },
  },
  async mounted() {
    // 获取分类
    await getCategoryList(this.page).then(({ data }) => {
      this.categoryList = data.data;
    });
    // this.firstId = this.categoryList[0].categoryId;
    // if (this.firstId) {
    this.getScenicList();
    // }
  },
};
</script>

<style lang="less" scoped>
.el-header {
  padding: 0;
}
.recommendScenic {
  width: 100%;
  .cate-card {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 40px;
    // 换行
    flex-wrap: wrap;
  }
  .scenicCard {
    padding-bottom: 50px;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    // 换行
    flex-wrap: wrap;
    .pager {
      position: absolute;
      bottom: 0;
      right: 20px;
    }
  }
}
.whichCategory {
  background-color: rgb(42, 42, 42);
  color: #fff;
}
.user-home {
  .w {
    width: 1280px;
    margin: 0 auto;
  }
  .search {
    position: relative;
    width: 100%;
    margin: auto;
    margin-bottom: 40px;
    height: 300px;
    padding: 20px;
    background: url("@/assets/images/bgImg.jpg") no-repeat center/cover;
    .searchPart {
      position: absolute;
      width: 60%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      justify-content: space-around;
      align-items: center;
    }
    .searchInput {
      width: 90%;
      display: block;
      height: 60px;
      border: 1.5px solid lightgrey;
      outline: none;
      transition: all 0.3s;
      box-shadow: 0px 0px 20px -18px;
      border-radius: 20px;
      &:hover {
        border: 3px solid lightgrey;
        box-shadow: 0px 0px 20px -17px;
      }
      &:focus {
        border: 2px solid rgb(111, 111, 111);
      }
    }
  }
}
</style>