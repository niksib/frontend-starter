import axios from 'axios';
import {
  AUTH_ERROR, AUTH_LOGOUT, AUTH_SUCCESS, SOCIAL_LOGIN_REQUEST,
} from '../actions/auth';
import { SET_USER_REQUEST } from '../actions/user';

const auth = {
  state: {
    token: localStorage.getItem('user-token') || '',
    status: '',
  },
  mutations: {
    [AUTH_SUCCESS]: (state, resp) => {
      state.status = 'success';
      state.token = resp.token;
    },
    [AUTH_ERROR]: (state) => {
      state.status = 'error';
    },
    [AUTH_LOGOUT]: (state) => {
      state.token = '';
    },
  },
  actions: {
    [SOCIAL_LOGIN_REQUEST]: ({ commit, dispatch }, { provider, socialToken }) => (
      new Promise((resolve, reject) => {
        axios.post(`/auth/social-login/${provider}`, socialToken)
          .then((resp) => {
            const { token } = resp.data;
            localStorage.setItem('user-token', token);
            commit(AUTH_SUCCESS, token);

            dispatch(SET_USER_REQUEST);
            resolve(resp);
          })
          .catch((err) => {
            commit(AUTH_ERROR, err);
            localStorage.removeItem('user-token');
            reject(err);
          });
      })),
    [AUTH_LOGOUT]: ({ commit }) => new Promise((resolve) => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem('user-token');
      resolve();
    }),
  },
  getters: {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
  },
};

export default auth;
