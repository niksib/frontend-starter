import Vue from 'vue';
import VueSocialauth from 'vue-social-auth';

Vue.use(VueSocialauth, {
  providers: {
    facebook: {
      clientId: '449043742370558',
      redirectUri: 'http://localhost:8081/auth/facebook/callback', // Your client app URL
    },
  },
});
