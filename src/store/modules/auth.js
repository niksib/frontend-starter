import axios from 'axios';
import {
  AUTH_LOGOUT, AUTH_REFRESH, AUTH_SUCCESS, SOCIAL_LOGIN_REQUEST,
} from '../actions/auth';
import { SET_USER_REQUEST } from '../actions/user';

const auth = {
  state: {
    token: localStorage.getItem('user-token') || '',
  },
  mutations: {
    [AUTH_SUCCESS]: (state, token) => {
      state.token = token;
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
            localStorage.removeItem('user-token');
            reject(err);
          });
      })),
    [AUTH_REFRESH]: ({ commit, dispatch }) => new Promise((resolve, reject) => {
      axios.post('/auth/refresh')
        .then((resp) => {
          const { token } = resp.data;
          localStorage.setItem('user-token', token);
          commit(AUTH_SUCCESS, token);

          dispatch(SET_USER_REQUEST);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    }),
    [AUTH_LOGOUT]: ({ commit }, force = false) => new Promise((resolve, reject) => {
      if (force) {
        commit(AUTH_LOGOUT);
        localStorage.removeItem('user-token');
        resolve();
      } else {
        axios.post('/auth/logout')
          .then(() => {
            commit(AUTH_LOGOUT);
            localStorage.removeItem('user-token');
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      }
    }),
  },
  getters: {
    isAuthenticated: state => !!state.token,
  },
};

export default auth;
