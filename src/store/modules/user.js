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
    [SET_USER_REQUEST]: ({ commit }) => {
      axios.post('/auth/me')
        .then((resp) => {
          commit(SET_USER_REQUEST, resp.data);
        })
        .catch((err) => {
          throw err;
        });
    },
  },
  getters: {

  },
};

export default user;
