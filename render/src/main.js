import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router';
import api from './utils/api';

Vue.config.productionTip = false;
Vue.use(ElementUI);

// 全局调用
Vue.prototype = Object.assign(Vue.prototype, api);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
