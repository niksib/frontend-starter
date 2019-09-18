import Vue from 'vue';

import './plugins/axios';
import './plugins/socialAuth';

import App from './App.vue';
import router from './router';
import store from './store/store';

import './middleware/auth';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
