import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import store from '@/store/store';
import { SET_NOTIFICATION } from '../store/actions/notification';
import { AUTH_LOGOUT, AUTH_REFRESH } from '../store/actions/auth';

let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRefreshed(token) {
  refreshSubscribers.map(cb => cb(token));
}

Vue.use(VueAxios, axios);

Vue.axios.defaults.baseURL = process.env.VUE_APP_API_URL;

Vue.axios.defaults.headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

Vue.axios.interceptors.request.use((config) => {
  // Do something before request is sent
  const userToken = localStorage.getItem('user-token');
  if (userToken) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${userToken}`;
  }

  return config;
});

Vue.axios.interceptors.response.use(response => response, (err) => {
  const STATUS_UNAUTHORIZED = 401;
  const notification = {
    type: 'danger',
    message: err.response.data.error,
  };

  if (err.response.status === STATUS_UNAUTHORIZED) {
    switch (err.response.data.error) {
      case 'TOKEN_EXPIRED':
        if (!isRefreshing) {
          isRefreshing = true;
          store.dispatch(AUTH_REFRESH).then((token) => {
            isRefreshing = false;
            onRefreshed(token);
            refreshSubscribers = [];
          });
        }

        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            err.config.headers.Authorization = `Bearer ${token}`;
            resolve(Vue.axios(err.config));
          });
        });
      case 'BAD_CREDENTIALS':
        break;
      case 'TOKEN_INVALID':
      case 'TOKEN_BLACKLISTED':
      default:
        store.dispatch(AUTH_LOGOUT, true);
        window.location.href = '/sign-in';
        break;
    }
  } else {
    store.dispatch(SET_NOTIFICATION, notification);
  }

  throw err;
});
