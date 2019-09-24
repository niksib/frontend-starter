import Vue from 'vue';
import Router from 'vue-router';

/** BASE ROUTES */
import Home from '@/views/Home.vue';
import About from '@/views/About.vue';
import PageNotFound from '@/views/PageNotFound.vue';

/** AUTH ROUTES */
import AuthSignIn from '@/views/auth/AuthSignIn.vue';
import AuthSignUp from '@/views/auth/AuthSignUp.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { requiresAuth: true },
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: AuthSignIn,
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: AuthSignUp,
    },
    {
      path: '*',
      component: PageNotFound,
    },
  ],
});
