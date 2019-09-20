<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info" class="mb-4">
      <b-navbar-brand to="/">Frontend starter</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="isAuthenticated">
            <template v-slot:button-content>
              <em>{{ user.email }}</em>
            </template>
            <b-dropdown-item to="/user-welcome">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-navbar-nav v-else>
            <b-nav-item to="/sign-in">Sign In</b-nav-item>
            <b-nav-item to="/sign-up">Sign Up</b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { AUTH_LOGOUT, AUTH_REFRESH } from './store/actions/auth';
import { SET_USER_REQUEST } from './store/actions/user';

export default {
  created() {
    if (this.isAuthenticated) {
      this.getUser()
        .catch((err) => {
          if (err.response.data.error) {
            switch (err.response.data.error) {
              case 'TOKEN_EXPIRED':
                this.refreshToken();
                break;
              case 'TOKEN_INVALID':
                this.$store.dispatch(AUTH_LOGOUT, true);
                break;
              default:
                break;
            }
          }
        });
    }
  },
  computed: {
    ...mapGetters({
      user: 'getUserInfo',
      isAuthenticated: 'isAuthenticated',
    }),
  },
  methods: {
    ...mapActions({
      getUser: SET_USER_REQUEST,
      refreshToken: AUTH_REFRESH,
    }),
    logout() {
      this.$store.dispatch(AUTH_LOGOUT)
        .then(() => {
          this.$router.push('/sign-in');
        });
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
