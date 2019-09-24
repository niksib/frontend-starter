<template>
  <div class="global-notifications">
    <div class="global-notifications__item"
         v-for="(notification, index) in notifications"
         :key="index">
      <b-alert show dismissible :variant="notification.type">
        {{ notification.message }}
      </b-alert>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'GlobalNotification',
  computed: {
    ...mapGetters({
      notifications: 'getNotifications',
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
