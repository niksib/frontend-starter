<template>
  <div class="global-notifications">
    <div class="global-notifications__item"
         v-for="(notification, index) in notifications"
         :key="index">
      <b-alert show
               dismissible
               :variant="notification.type"
               @dismissed="removeNotification(index)">
        {{ notification.message }}
      </b-alert>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { REMOVE_NOTIFICATION } from '../store/actions/notification';

export default {
  name: 'GlobalNotification',
  computed: {
    ...mapGetters({
      notifications: 'getNotifications',
    }),
  },
  methods: {
    ...mapActions({
      removeNotification: REMOVE_NOTIFICATION,
    }),
  },
};
</script>

<style lang="scss" scoped>
.global-notifications {
  position: absolute;
  top: 10px;
  right: 10px;

  &__item {

  }
}
</style>
