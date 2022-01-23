import { fetchPlayers } from '../scripts/api';

export default {
  name: 'TowerView',
  props: ['id'],
  data: () => ({
    players: [],
  }),
  async created() {
    this.players = await fetchPlayers();
  },
};
