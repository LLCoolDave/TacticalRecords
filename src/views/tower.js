import { fetchTower } from '../scripts/api';

export default {
  name: 'TowerView',
  data: () => ({
    towerData: {},
  }),
  props: ['id'],
  async created() {
    this.towerData = fetchTower(this.id);
  },
};
