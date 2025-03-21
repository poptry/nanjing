<template>
  <div class="card-container" @click="handlerClick">
    <div class="card">
      <img :src="scenicData.image" style=" object-fit: cover; width: 100%; height: 100%;"
        alt="未加载" />
    </div>
    <div style="margin-top: 10px;">
      <span style="font-size: 20px;font-weight: 500;">{{ scenicData.name }}</span>
    </div>

  </div>
</template>

<script>
export default {
  name: "Card",
  props: ["scenicData"],
  data() {
    return {};
  },
  methods: {
    handlerClick() {
      this.$emit("scenicClick", this.scenicData);
    },
  },
  mounted() {},
};
</script>

<style lang="less" scoped>
.card-container {
  width: 90%/5;
  margin: 0 10%/5/2;
  margin-bottom: 40px;
  cursor: pointer;
}
.card {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 254px;
  background: rgb(236, 236, 236);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}
</style>