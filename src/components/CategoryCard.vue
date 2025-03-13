<template>
  <div class="card" @click="handlerClick">
    <h3>{{ categoryData.categoryName }}</h3>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["categoryData"],
  data() {
    return {};
  },
  methods: {
    handlerClick() {
      this.$emit("clickCategory", this.categoryData);
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.card {
  width: 90%/10;
  margin: 0 10%/2/10;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 20px;
  border: 2px solid rgb(20, 20, 20);
  cursor: pointer;
  transition: all 0.3s;
  h3 {
    font-weight: 500;
    font-size: 16px;
    white-space: nowrap; /* 禁止换行 */
    overflow: hidden; /* 超出部分隐藏 */
    text-overflow: ellipsis; /* 使用省略号代替超出部分 */
  }
  &:hover {
    background-color: rgb(20, 20, 20);
    h3 {
      color: #fff;
    }
  }
}
</style>