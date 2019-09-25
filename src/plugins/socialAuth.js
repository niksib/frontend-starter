import Vue from 'vue';
import VueSocialauth from 'vue-social-auth';

Vue.use(VueSocialauth, {
  providers: {
    facebook: {
      clientId: process.env.VUE_APP_FACEBOOK_CLIENT_ID,
      redirectUri: `${process.env.VUE_APP_URL}/auth/facebook/callback`, // Your client app URL
    },
  },
});
