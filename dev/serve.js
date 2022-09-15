import Vue from 'vue';
import Dev from './serve.vue';
// element ui 样式文件
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(Dev),
}).$mount('#app');
