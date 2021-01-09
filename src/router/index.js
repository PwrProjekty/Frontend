import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/admin/leaders',
    name: 'LeadersAdmin',
    component: () => import('../views/admin/LeadersAdmin'),
  },
  {
    path: '/admin/Trails',
    name: 'TrailsAdmin',
    component: () => import('../views/admin/TrailsAdmin'),
  },
  {
    path: '/admin/waypoints',
    name: 'WaypointAdmin',
    component: () => import('../views/admin/WaypointsAdmin'),
  },
  {
    path: '/leader/trips',
    name: 'WaitingTrips',
    component: () => import('../views/leader/WaitingTrips'),
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
