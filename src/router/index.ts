import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        public: false,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        public: true,
        skipIfAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (!to.meta.public && !authStore.isAuthenticated) {
    return next('/login');
  }
  if (to.meta.skipIfAuth && authStore.isAuthenticated) {
    return next('/');
  }
  document.title =
    (to.name as string).charAt(0).toUpperCase() +
    (to.name as string).slice(1) +
    ' | ' +
    'PRDLY Lite';
  next();
});

export default router;
