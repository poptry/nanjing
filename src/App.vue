<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
<style lang="less">
.el-tooltip__popper {
  max-width: 60% !important; //宽度可根据自己需要进行设置
  max-height: 150px !important; //高度可根据自己需要进行设置
  overflow: hidden !important;
  // 滚动条
  overflow-y: auto !important;
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
h3,
p {
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
}
* {
  box-sizing: border-box;
}
</style>