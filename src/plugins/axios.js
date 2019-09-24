import Vue from 'vue';
import VueAxios from 'vue-axios';
import axios from 'axios';
import store from '@/store/store';
import { SET_NOTIFICATION } from '../store/actions/notification';

Vue.use(VueAxios, axios);

Vue.axios.defaults.baseURL = 'http://simple-poll.localhost:5600/api/';

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
  const notification = {
    type: 'danger',
    message: err.response.data.error,
  };

  store.commit(SET_NOTIFICATION, notification);

  throw err;
  // TODO handle token expire and unauthorized
});
