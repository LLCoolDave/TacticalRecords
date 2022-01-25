import { createRouter, createWebHistory } from 'vue-router';
import Towers from '../views/Towers.vue';
import Records from '../views/Records.vue';
import Tower from '../views/Tower.vue';
import Player from '../views/Player.vue';
import Profile from '../views/Profile.vue';
import RunEdit from '../views/RunEdit.vue';
import Players from '../views/Players.vue';
import Run from '../views/Run.vue';
import Compare from '../views/Compare.vue';
import { authenticationGuard } from '../scripts/auth0';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Records,
  },
  {
    path: '/towers',
    name: 'Towers',
    component: Towers,
  },
  {
    path: '/records',
    name: 'Records',
    component: Records,
  },
  {
    path: '/players',
    name: 'Players',
    component: Players,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: authenticationGuard,
  },
  {
    path: '/tower/:id',
    name: 'Tower',
    component: Tower,
    props: true,
  },
  {
    path: '/player/:id',
    name: 'Player',
    component: Player,
    props: true,
  },
  {
    path: '/run/edit/:id',
    name: 'RunEdit',
    component: RunEdit,
    props: true,
    beforeEnter: authenticationGuard,
  },
  {
    path: '/run/:id',
    name: 'Run',
    component: Run,
    props: true,
  },
  {
    path: '/run/new/',
    name: 'NewRun',
    component: RunEdit,
    beforeEnter: authenticationGuard,
  },
  {
    path: '/compare/:playerId/:compareId',
    name: 'ComparePlayers',
    component: Compare,
    props: (route) => ({ playerId: route.params.playerId, compareId: route.params.compareId, mode: 'player' }),
  },
  {
    path: '/compare/:playerId/records',
    name: 'CompareRecords',
    component: Compare,
    props: (route) => ({ playerId: route.params.playerId, compareId: null, mode: 'records' }),
  },
  {
    path: '/compare/:playerId/sunstones/:compareId',
    name: 'CompareSunstones',
    component: Compare,
    props: (route) => ({ playerId: route.params.playerId, compareId: route.params.compareId, mode: 'sunstones' }),
  },
  {
    path: '/compare/:playerId/progress',
    name: 'CompareMetaProgress',
    component: Compare,
    props: (route) => ({ playerId: route.params.playerId, compareId: null, mode: 'meta' }),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

require.context('../assets', false);
