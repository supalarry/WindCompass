import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/tailwind.css';
import http30MHz from './plugins/http/30MHzApi';

Vue.config.productionTip = false;

Vue.use(http30MHz);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
