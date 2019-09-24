import Vue from 'vue';
import Vuex from 'vuex';

import user from '@/store/modules/user';
import auth from '@/store/modules/auth';
import notification from '@/store/modules/notification';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    auth,
    notification,
  },
});
