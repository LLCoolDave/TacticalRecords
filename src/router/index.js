import { createRouter, createWebHistory } from 'vue-router';
import Towers from '../views/Towers.vue';
import Tower from '../views/Tower.vue';
import Home from '../views/Home.vue';
import Player from '../views/Player.vue';
import Profile from '../views/Profile.vue';
import { authenticationGuard } from '../scripts/auth0';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/towers',
    name: 'Towers',
    component: Towers,
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

require.context('../assets', false);
