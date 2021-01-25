const adminRoutes = [
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
];

export default adminRoutes;
