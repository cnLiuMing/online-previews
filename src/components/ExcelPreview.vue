<template>
  <Dialog
    :visible.sync="excelVisible"
    fullscreen
    append-to-body
    :modal="false"
    @open="init"
    @close="excelVisible = false"
  >
    <div id="luckysheet" class="luckysheet"></div>
  </Dialog>
</template>

<script>
import { Dialog } from "element-ui";
import LuckyExcel from "luckyexcel";
export default {
  name: "ExcelPreview",
  components: { Dialog },
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
    return {};
  },
  computed: {
    excelVisible: {
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
      LuckyExcel.transformExcelToLucky(
        this.blob,
        (exportJson, luckysheetfile) => {
          if (exportJson.sheets == null || exportJson.sheets.length == 0) {
            alert("无法从此excel文件中读取内容!");
            return;
          }
          window.luckysheet.destroy();

          window.luckysheet.create({
            container: "luckysheet", //luckysheet is the container id
            showinfobar: false,
            data: exportJson.sheets,
            title: exportJson.info.name,
            userInfo: exportJson.info.creator,
            lang: "zh",
            showsheetbar: true, // 是否显示底部sheet页按钮
            showsheetbarConfig: {
              add: false,
            },
            showstatisticBar: true, // 是否显示底部计数栏
            sheetFormulaBar: false,
            enableAddRow: false,
            showtoolbarConfig: {
              undoRedo: false, //撤销重做，注意撤消重做是两个按钮，由这一个配置决定显示还是隐藏
              paintFormat: false, //格式刷
              currencyFormat: false, //货币格式
              percentageFormat: false, //百分比格式
              numberDecrease: false, // '减少小数位数'
              numberIncrease: false, // '增加小数位数
              moreFormats: false, // '更多格式'
              font: false, // '字体'
              fontSize: false, // '字号大小'
              bold: false, // '粗体 (Ctrl+B)'
              italic: false, // '斜体 (Ctrl+I)'
              strikethrough: false, // '删除线 (Alt+Shift+5)'
              underline: false, // '下划线 (Alt+Shift+6)'
              textColor: false, // '文本颜色'
              fillColor: false, // '单元格颜色'
              border: false, // '边框'
              mergeCell: false, // '合并单元格'
              horizontalAlignMode: false, // '水平对齐方式'
              verticalAlignMode: false, // '垂直对齐方式'
              textWrapMode: false, // '换行方式'
              textRotateMode: false, // '文本旋转方式'
              image: false, // '插入图片'
              link: false, // '插入链接'
              chart: false, // '图表'（图标隐藏，但是如果配置了chart插件，右击仍然可以新建图表）
              postil: false, //'批注'
              pivotTable: false, //'数据透视表'
              function: false, // '公式'
              frozenMode: false, // '冻结方式'
              sortAndFilter: false, // '排序和筛选'
              conditionalFormat: false, // '条件格式'
              dataVerification: false, // '数据验证'
              splitColumn: false, // '分列'
              screenshot: false, // '截图'
              findAndReplace: false, // '查找替换'
              protection: false, // '工作表保护'
              print: false, // '打印'
            },
          });
        }
      );
    },
  },
};
</script>

<style scoped>
.luckysheet {
  margin: 0px;
  padding: 0px;
  position: absolute;
  width: 100%;
  left: 0px;
  top: 50px;
  bottom: 0px;
}
</style>
