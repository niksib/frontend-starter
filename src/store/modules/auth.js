import axios from 'axios';
import {
  AUTH_LOGOUT,
  AUTH_REFRESH,
  AUTH_SET_TOKEN,
  AUTH_SUCCESS,
  DEFAULT_LOGIN_REQUEST,
  SOCIAL_LOGIN_REQUEST,
} from '../actions/auth';
import { SET_USER_REQUEST } from '../actions/user';

const auth = {
  state: {
    token: localStorage.getItem('user-token') || '',
  },
  mutations: {
    [AUTH_SUCCESS]: (state, token) => {
      localStorage.setItem('user-token', token);
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
            commit(AUTH_SUCCESS, token);

            dispatch(SET_USER_REQUEST);
            resolve(resp);
          })
          .catch((err) => {
            localStorage.removeItem('user-token');
            reject(err);
          });
      })),
    [DEFAULT_LOGIN_REQUEST]: ({ commit, dispatch }, { email, password }) => (
      new Promise((resolve, reject) => {
        axios.post('/auth/login', {
          email,
          password,
        })
          .then((resp) => {
            const { token } = resp.data;
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
    [AUTH_SET_TOKEN]: ({ commit }, token) => {
      commit(AUTH_SUCCESS, token);
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
  },
};

export default auth;
