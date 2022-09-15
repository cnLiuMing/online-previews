<template>
  <Dialog
    :visible.sync="imgVisible"
    fullscreen
    append-to-body
    :modal="false"
    @open="init"
    @close="imgVisible = false"
    class="imgWrapper"
  >
    <ElImage class="image" :src="src" :preview-src-list="[src]" />
  </Dialog>
</template>

<script>
import { Dialog, Image } from "element-ui";
export default {
  name: "ImgPreview",
  components: { Dialog, ElImage: Image },
  props: {
    /**显隐控制 */
    visible: {
      type: Boolean,
    },
    /**
     * 文件二进制流
     */
    blob: {
      type: Blob,
    },
  },
  data() {
    return {
      src: "",
    };
  },
  computed: {
    imgVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      },
    },
  },
  methods: {
    async init() {
      this.src = window.URL.createObjectURL(this.blob);
    },
  },
};
</script>

<style>
.imgWrapper .el-dialog__body {
  display: flex;
  justify-content: center;
}
</style>
