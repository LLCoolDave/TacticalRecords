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
import Latest from '../views/Latest.vue';
import { getInstance } from '../scripts/auth0';

let router;

function redirectLogin(to) {
  const authService = getInstance();

  if (authService.state.loading) {
    setTimeout(redirectLogin, 50, to);
  } else if (authService.state.isAuthenticated) {
    router.push(to);
    console.log(`route to ${to}`);
  } else {
    authService.loginWithRedirect({ appState: { targetUrl: to } });
  }
}

export const authenticationGuard = (to, from, next) => {
  const authService = getInstance();

  // If the Auth0Plugin has not loaded yet, redirect to the homepage and push an async handler to check again later
  if (authService.state.loading) {
    setTimeout(redirectLogin, 50, to.fullPath);
    return next('/');
  }

  // If user is authenticated they may proceed
  if (authService.state.isAuthenticated) {
    return next();
  }
  // Otherwise open the login page and redirect to homepage
  authService.loginWithRedirect({ appState: { targetUrl: to.fullPath } });
  return next('/');
};

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
    path: '/latest',
    name: 'MostRecent',
    component: Latest,
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

router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

const expRouter = router;

export default expRouter;

require.context('../assets', false);
