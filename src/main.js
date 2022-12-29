import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import TowerScore from './components/TowerScore.vue';
import PlayerScore from './components/PlayerScore.vue';
import PlayerDisplay from './components/PlayerDisplay.vue';
import TNIcon from './components/TNIcon.vue';
import LegacyIcon from './components/LegacyIcon.vue';
import LogInStatus from './components/LogInStatus.vue';
import MedalRow from './components/MedalRow.vue';
import LegacyEdit from './components/LegacyEdit.vue';
import LegacyButton from './components/LegacyButton.vue';
import LegacyRow from './components/LegacyRow.vue';

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
app.component('tn-icon', TNIcon);
app.component('legacy-icon', LegacyIcon);
app.component('login-status', LogInStatus);
app.component('player-score', PlayerScore);
app.component('player-display', PlayerDisplay);
app.component('medal-row', MedalRow);
app.component('legacy-edit', LegacyEdit);
app.component('legacy-button', LegacyButton);
app.component('legacy-row', LegacyRow);

app.mount('#app');
