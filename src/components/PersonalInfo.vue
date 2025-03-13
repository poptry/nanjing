<template>
  <div class="personal-info">
    <h1>Personal Information</h1>
    <p>This is a sample component.</p>
  </div>
</template>

<script>
export default {
  name: "PersonalInfo",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.personal-info {
  h1 {
    color: @primary-color;
  }
  p {
    font-size: 14px;
  }
}
</style>