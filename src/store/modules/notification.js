import { REMOVE_NOTIFICATION, SET_NOTIFICATION } from '../actions/notification';

const notification = {
  state: {
    notifications: [],
  },
  mutations: {
    [SET_NOTIFICATION]: (state, notificationData) => {
      state.notifications.push(notificationData);
    },
    [REMOVE_NOTIFICATION]: (state, notificationId) => {
      state.notifications.splice(notificationId, 1);
    },
  },
  actions: {
    [SET_NOTIFICATION]: ({ commit }, notificationData) => {
      commit(SET_NOTIFICATION, notificationData);
    },
    [REMOVE_NOTIFICATION]: ({ commit }, notificationId) => {
      commit(REMOVE_NOTIFICATION, notificationId);
    },
  },
  getters: {
    getNotifications: state => state.notifications,
  },
};

export default notification;
