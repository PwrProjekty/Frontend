import { createRouter, createWebHashHistory } from 'vue-router';
import adminRoutes from '@/router/admin';
import leaderRoutes from '@/router/leader';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
].concat(adminRoutes, leaderRoutes);

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
