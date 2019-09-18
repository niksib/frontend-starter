import router from '../router';
import store from '../store/store';

router.beforeEach((to, from, next) => {
  if (to.name === 'auth' && store.getters.isAuthenticated) {
    next('/');
    return;
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
