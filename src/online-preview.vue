<script>
import ExcelPreview from "@/components/ExcelPreview.vue";
import DocxPreview from "@/components/DocxPreview.vue";
import PdfPreview from "@/components/PdfPreview.vue";
import ImgPreview from "@/components/ImgPreview.vue";
import TxtPreview from "@/components/TxtPreview.vue";
import { Message, Upload, Button } from "element-ui";
export default /*#__PURE__*/ {
  name: "OnlinePreview", // vue component name
  components: {
    ExcelPreview,
    DocxPreview,
    PdfPreview,
    ImgPreview,
    TxtPreview,
    Upload,
    Button,
  },
  data() {
    return {
      excelVisible: false,
      txtVisible: false,
      docxVisible: false,
      pdfVisible: false,
      imgVisible: false,
      /**
       * 文件二进制流
       */
      blob: null,
    };
  },
  computed: {},
  methods: {
    upload() {},
    /**
     * @param {string} 文件名称
     * @param {Blob} 文件二进制流
     */
    show(fileName, blob) {
      this.init();
      /**文件后缀 */
      const EXT = fileName.split(".").pop();
      /**文件二进制流 */
      this.blob = blob;

      switch (EXT) {
        case "pdf": {
          this.pdfVisible = true;
          break;
        }
        case "docx": {
          this.docxVisible = true;
          break;
        }
        case "xlsx":
        case "xls": {
          this.excelVisible = true;
          break;
        }
        case "txt": {
          this.txtVisible = true;
          break;
        }
        case "png":
        case "jpg":
        case "jpeg":
        case "gif": {
          this.imgVisible = true;
          break;
        }
        default: {
          Message.warning(`暂不支持在线预览.${EXT}格式文件`);
        }
      }
    },
    /**
     * 初始化
     */
    init() {
      this.imgVisible = false;
      this.excelVisible = false;
      this.docxVisible = false;
      this.txtVisible = false;
      this.pdfVisible = false;
      this.blob = false;
    },
    onChange(file) {
      console.log(file);
      if (!file.raw) return;
      const reader = new FileReader();
      reader.readAsArrayBuffer(file.raw);
      let blob = null;
      reader.onload = (e) => {
        if (typeof e.target.result === "object") {
          blob = new Blob([e.target.result]);
        } else {
          blob = e.target.result;
        }

        this.show(file.name, blob);
      };
    },
  },
};
</script>

<template>
  <div class="online-preview">
    <ExcelPreview :visible.sync="excelVisible" :blob="blob" />
    <DocxPreview :visible.sync="docxVisible" :blob="blob" />
    <PdfPreview :visible.sync="pdfVisible" :blob="blob" />
    <ImgPreview :visible.sync="imgVisible" :blob="blob" />
    <TxtPreview :visible.sync="txtVisible" :blob="blob" />

    <!-- <Upload
      action=""
      :auto-upload="false"
      :show-file-list="false"
      :on-change="onChange"
    >
      <Button size="small" type="primary">点击上传</Button>
    </Upload> -->
  </div>
</template>

<style scoped></style>
