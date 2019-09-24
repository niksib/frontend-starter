import { SET_NOTIFICATION } from '../actions/notification';

const notification = {
  state: {
    notifications: [],
  },
  mutations: {
    [SET_NOTIFICATION]: (state, notificationData) => {
      state.notifications.push(notificationData);
    },
  },
  actions: {
    [SET_NOTIFICATION]: ({ commit }, notificationData) => {
      commit(SET_NOTIFICATION, notificationData);
    },
  },
  getters: {
    getNotifications: state => state.notifications,
  },
};

export default notification;
