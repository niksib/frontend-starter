import axios from 'axios';
import { SET_USER_REQUEST } from '../actions/user';

const user = {
  state: {
    user: false,
  },
  mutations: {
    [SET_USER_REQUEST]: (state, userData) => {
      state.user = userData;
    },
  },
  actions: {
    [SET_USER_REQUEST]: ({ commit }) => new Promise((resolve, reject) => {
      axios.post('/auth/me')
        .then((resp) => {
          commit(SET_USER_REQUEST, resp.data);
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    }),
  },
  getters: {
    getUserInfo: state => state.user,
  },
};

export default user;
