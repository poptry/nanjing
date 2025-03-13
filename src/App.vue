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