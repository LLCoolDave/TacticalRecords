import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import TowerScore from './components/TowerScore.vue';
import MedalIcon from './components/MedalIcon.vue';

const app = createApp(App).use(store).use(router);

app.component('tower-score', TowerScore);
app.component('medal-icon', MedalIcon);

app.mount('#app');
