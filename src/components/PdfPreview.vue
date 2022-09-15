<template>
  <Dialog
    :visible.sync="pdfVisible"
    fullscreen
    append-to-body
    :modal="false"
    @open="init"
    @close="close"
    ref="pdf"
  >
    <div class="home_wrap">
      <ButtonGroup class="pdf_down">
        <Button type="primary" icon="el-icon-zoom-in" @click="scaleD()"
          >放大</Button
        >
        <Button type="primary" icon="el-icon-zoom-out" @click="scaleX()"
          >缩小</Button
        >
      </ButtonGroup>

      <div :style="{ width: pdf_div_width, margin: '0 auto' }">
        <canvas
          v-for="page in pdf_pages"
          :id="'the_canvas' + page"
          :key="page"
        ></canvas>
      </div>
    </div>
  </Dialog>
</template>

<script>
let PDFJS = require("pdfjs-dist");
PDFJS.GlobalWorkerOptions.workerSrc = require("pdfjs-dist/build/pdf.worker.entry.js");
import { Button, ButtonGroup, Dialog } from "element-ui";
export default {
  name: "PdfPreview",
  components: { Button, ButtonGroup, Dialog },
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
      pdf_scale: 1.4, //pdf放大系数
      pdf_pages: [],
      pdf_div_width: "",
    };
  },
  computed: {
    pdfVisible: {
      get() {
        return this.visible;
      },
      set(value) {
        this.$emit("update:visible", value);
      },
    },
  },
  methods: {
    scaleD() {
      //放大
      let max = 0;
      if (window.screen.width > 1440) {
        max = 2.0;
      } else {
        max = 1.2;
      }
      if (this.pdf_scale >= max) {
        return;
      }
      this.pdf_scale = this.pdf_scale + 0.2;
      this.init();
    },
    scaleX() {
      //缩小
      let min = 1.0;
      if (this.pdf_scale <= min) {
        return;
      }
      this.pdf_scale = this.pdf_scale - 0.2;
      this.init();
    },
    init() {
      const url = window.URL.createObjectURL(this.blob);
      //初始化pdf
      let loadingTask = PDFJS.getDocument(url);
      loadingTask.promise.then((pdf) => {
        this.pdfDoc = pdf;
        this.pdf_pages = this.pdfDoc.numPages;
        //debugger
        this.$nextTick(() => {
          this._renderPage(1);
        });
      });
    },
    _renderPage(num) {
      //渲染pdf页
      const that = this;
      this.pdfDoc.getPage(num).then((page) => {
        let canvas = document.getElementById("the_canvas" + num);
        let ctx = canvas.getContext("2d");
        let dpr = window.devicePixelRatio || 1;
        let bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1;
        let ratio = dpr / bsr;
        let viewport = page.getViewport({ scale: this.pdf_scale });

        canvas.width = viewport.width * ratio;
        canvas.height = viewport.height * ratio;

        canvas.style.width = viewport.width + "px";

        that.pdf_div_width = viewport.width + "px";

        canvas.style.height = viewport.height + "px";

        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        let renderContext = {
          canvasContext: ctx,
          viewport: viewport,
        };
        page.render(renderContext);
        if (this.pdf_pages > num) {
          this._renderPage(num + 1);
        }
      });
    },
    close() {
      this.pdfVisible = false;
      this.pdf_pages = [];
      this.pdf_div_width = "";
    },
  },
};
</script>

<style scoped>
.home_wrap {
  width: 100%;
  height: 100%;
}
.pdf_down {
  position: fixed;
  display: flex;
  z-index: 20;
  right: 26px;
  bottom: 7%;
}
</style>
