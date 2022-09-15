<template>
  <Dialog
    :visible.sync="docxVisible"
    fullscreen
    append-to-body
    :modal="false"
    @open="init"
    @close="docxVisible = false"
  >
    <div ref="docx" class="docx"></div>
  </Dialog>
</template>

<script>
import { Dialog } from "element-ui";
import { renderAsync } from "docx-preview";
export default {
  name: "DocxPreview",
  components: { Dialog },
  props: {
    /**显隐控制 */
    visible: {
      type: Boolean,
    },
    /**文件二进制流 */
    blob: {
      type: Blob,
    },
  },
  data() {
    return {};
  },
  computed: {
    docxVisible: {
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
      renderAsync(this.blob, this.$refs.docx);
    },
  },
};
</script>

<style scoped>
.docx {
  margin: 0px;
  padding: 0px;
  position: absolute;
  width: 100%;
  left: 0px;
  top: 50px;
  bottom: 0px;
}
</style>
