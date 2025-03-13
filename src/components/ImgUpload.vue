<template>
  <div class="strategy">
    <div class="change-photo-zoom">
      <el-upload class="avatar-uploader" :show-file-list="false" action="''"
        :on-change="handleLicensePreview" :auto-upload="false">
        <img v-if="image.imageUrl" :src="image.imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <button class="btn" @click="uploadAvatar">保存头像</button>
    </div>
  </div>
</template>
  
  <script>
import { Loading } from "element-ui";
import { uploadImg } from "@/api";
export default {
  props: ["uploadvisible"],
  data() {
    return {
      image: {
        imageUrl: "",
      },
      file: null,
      fileName: "",
    };
  },
  computed: {},
  methods: {
    handleLicensePreview(file) {
      // 文件只能是图片格式
      const isJPG =
        file.raw.type === "image/jpg" ||
        file.raw.type === "image/png" ||
        file.raw.type === "image/jpeg";
      // 大小不超过 2MB
      const isLt2M = file.raw.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("请上传 JPG/PNG 格式的图片!");
        return false;
      } else if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
        return false;
      }
      this.file = file.raw;
      this.fileName = file.name; // 获取文件名
      this.image.imageUrl = URL.createObjectURL(file.raw);
    },
    uploadAvatar() {
      if (!this.image.imageUrl) {
        this.$message.error("请先选择图片");
        return false;
      }
      let loadingInstance = Loading.service();
      let formData = new FormData();
      formData.append("file", this.file, this.fileName);
      if (formData) {
        uploadImg(formData).then(({ data }) => {
          // 上传后返回URL，调用父事件，对url进行赋值
          this.$emit("getURL", data.data);
          loadingInstance.close();
        });
      }
      // updateAvatar(formData).then((res) => {
      //   if (res.data.code === 200) {
      // this.$message.success("更换头像成功");
      // this.$nextTick(() => {
      //   // 以服务的方式调用的 Loading 需要异步关闭
      //   loadingInstance.close();
      // });
      // this.image.imageUrl = "";
      // }
      // });
    },
  },
  mounted() {},
};
</script>
  
  <style lang="less" scoped>
.strategy {
  width: 100%;
  padding: 20px;
  .change-photo-zoom {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .avatar-uploader {
      width: 200px;
      height: 200px;
      border: 1px dashed #d9d9d9;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      .avatar {
        width: 200px;
        height: 200px;
        display: block;
      }

      .avatar-uploader-icon {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 28px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
      }
    }
    .avatar-uploader-white {
      border: 1px dashed #3b3b3b;
    }
    .btn {
      margin-top: 20px;
      width: 100px;
      height: 40px;
      border-radius: 5px;
      transition: all 0.3s;
      cursor: pointer;
      font-size: 1em;
      font-weight: 400;
      font-family: "Montserrat", sans-serif;
      &:hover {
        background: #4e4c4c;
        color: white;
        font-size: 1.1em;
      }
    }
  }
}
</style>