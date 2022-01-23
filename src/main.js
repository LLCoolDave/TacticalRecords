import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import TowerScore from './components/TowerScore.vue';
import PlayerScore from './components/PlayerScore.vue';
import PlayerDisplay from './components/PlayerDisplay.vue';
import MedalIcon from './components/MedalIcon.vue';
import StatIcon from './components/StatIcon.vue';
import LogInStatus from './components/LogInStatus.vue';

import { Auth0Plugin } from './scripts/auth0';

const app = createApp(App).use(store).use(router);

const domain = process.env.VUE_APP_AUTH0_DOMAIN;
const clientId = process.env.VUE_APP_AUTH0_CLIENT_ID;
const audience = process.env.VUE_APP_AUTH0_AUDIENCE;
app.use(Auth0Plugin, {
  domain,
  clientId,
  audience,
  onRedirectCallback: (appState) => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname,
    );
  },
  cacheLocation: 'localstorage',
});

app.component('tower-score', TowerScore);
app.component('medal-icon', MedalIcon);
app.component('stat-icon', StatIcon);
app.component('login-status', LogInStatus);
app.component('player-score', PlayerScore);
app.component('player-display', PlayerDisplay);

app.mount('#app');
