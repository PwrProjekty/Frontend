const leaderRoutes = [
  {
    path: '/leader/trips',
    name: 'WaitingTrips',
    component: () => import('../views/leader/WaitingTrips'),
  },
];

export default leaderRoutes;
