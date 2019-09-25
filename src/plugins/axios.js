import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import store from '@/store/store';
import { SET_NOTIFICATION } from '../store/actions/notification';
import { AUTH_LOGOUT, AUTH_REFRESH } from '../store/actions/auth';

Vue.use(VueAxios, axios);

Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL;

Vue.axios.defaults.headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

Vue.axios.interceptors.request.use((config) => {
  // Do something before request is sent
  if (localStorage.getItem('user-token')) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${localStorage.getItem('user-token')}`;
  }

  return config;
});

Vue.axios.interceptors.response.use(response => response, (err) => {
  const STATUS_UNAUTHORIZED = 401;
  const notification = {
    type: 'danger',
    message: err.response.data.error,
  };

  if (err.response.status === STATUS_UNAUTHORIZED && err.response.data.error) {
    switch (err.response.data.error) {
      case 'TOKEN_EXPIRED':
        store.dispatch(AUTH_REFRESH);
        break;
      case 'TOKEN_INVALID':
        store.dispatch(AUTH_LOGOUT, true);
        break;
      default:
        break;
    }
  } else {
    store.dispatch(SET_NOTIFICATION, notification);
  }

  throw err;
});
