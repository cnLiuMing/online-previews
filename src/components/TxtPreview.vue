<template>
  <Dialog
    :visible.sync="txtVisible"
    fullscreen
    append-to-body
    :modal="false"
    @open="init"
    @close="txtVisible = false"
  >
    <Input
      type="textarea"
      v-model="txt"
      readonly
      class="txt"
      :rows="20"
    ></Input>
  </Dialog>
</template>

<script>
import { Dialog, Input } from "element-ui";
export default {
  name: "TxtPreview",
  components: { Dialog, Input },
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
      txt: "",
    };
  },
  computed: {
    txtVisible: {
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
      const reader = new FileReader();
      reader.readAsText(this.blob, "utf-8");
      reader.onload = (e) => {
        this.txt = e.target.result;
      };
    },
  },
};
</script>

<style >
.txt .el-textarea__inner {
  height: calc(100vh - 80px);
  border: none;
}
</style>
