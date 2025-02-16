<template>
  <div class="tabs">
    <el-tag v-for="(item, index) in tags" :key="item.path" :closable="item.name !== 'home'"
      :effect="$route.name === item.name ? 'dark' : 'plain'" @click="changeMenu(item)"
      @close="handleClose(item, index)" size="small">
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations(["closeTag"]),
    changeMenu(item) {
      this.$router.push({ name: item.name });
    },
    handleClose(item, index) {
      console.log(item, index);
      //原来的索引
      const length = this.tags.length - 1;
      this.closeTag(item);
      //删除后跳转逻辑·
      //删除的不是当前路由
      if (item.name !== this.$route.name) {
        return;
      }
      //删除的是最后一个
      //判断规则就是删除的那个索引值是否和最后一个值的索引相等
      if (index === length) {
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.tabs {
  padding: 20px;

  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>