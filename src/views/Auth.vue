<template>
  <div class="auth">
    <h1>This is an auth page</h1>
    <button @click="authProvider('facebook')"
            v-if="!$store.state.auth.isAuthenticated">auth Facebook</button>
  </div>
</template>

<script>

import { mapActions } from 'vuex';
import { SOCIAL_LOGIN_REQUEST } from '../store/actions/auth';

export default {
  name: 'auth',
  methods: {
    ...mapActions({
      socialLogin: SOCIAL_LOGIN_REQUEST,
    }),

    authProvider(provider) {
      this.$auth.authenticate(provider)
        .then((socialToken) => {
          this.socialLogin({ provider, socialToken });
        })
        .catch((err) => {
          // TODO handle social error
          throw err;
        });
    },
  },
};
</script>
