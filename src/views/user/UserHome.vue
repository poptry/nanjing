<template>
  <div class="user-home">
    <!-- 搜索 -->
    <div class="search">
      <input class="searchInput" name="text" type="text" placeholder="Search the internet...">
    </div>
    <div class="w recommendScenic">
      <!-- 分类 -->
      <div style="margin-bottom: 20px;">
        <span style="font-size: 20px;font-weight: 600;">景点分类</span>
      </div>
      <div class="cate-card">
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
      </div>
    </div>
  </div>
</template>

<script>
import CommonCard from "@/components/CommonCard";
import CommonHeader from "../../components/CommonHeader.vue";
import CategoryCard from "@/components/CategoryCard.vue";
import ScenicDialog from "@/components/ScenicDialog.vue";
import { getCategoryList, getAttractionList } from "@/api";
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
      recommendList: [],
      categoryList: [],
      scenicList: [],
      firstId: 0,
      page: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  methods: {
    clickCategory(category) {
      this.firstId = category.categoryId;
      this.getScenicList();
    },
    clickScenic(scenicData) {
      this.$router.push({
        name: "attraction",
        params: { scenicData: JSON.stringify(scenicData) },
      });
    },
    // 获取景点
    async getScenicList() {
      await getAttractionList({ categoryId: this.firstId, ...this.page }).then(
        ({ data }) => {
          console.log(data.data);
          this.scenicList = data.data;
        }
      );
    },
  },
  async mounted() {
    // 获取分类
    await getCategoryList(this.page).then(({ data }) => {
      this.categoryList = data.data;
    });
    this.firstId = this.categoryList[0].categoryId;
    if (this.firstId) {
      this.getScenicList();
    }
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
  }
  .scenicCard {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
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
    width: 1140px;
    margin: 80px auto;
    height: 300px;
    padding: 20px;
    background: url("@/assets/images/bgImg.jpg") no-repeat center/cover;
    .searchInput {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: block;
      width: 60%;
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