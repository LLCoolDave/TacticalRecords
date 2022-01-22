import { fetchTower } from '../scripts/api';

export default {
  name: 'TowerView',
  data: () => ({
    towerData: {},
  }),
  props: ['id'],
  async created() {
    this.towerData = await fetchTower(this.id);
  },
};
