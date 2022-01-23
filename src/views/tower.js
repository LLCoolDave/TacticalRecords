import { fetchTowerRuns } from '../scripts/api';

export default {
  name: 'TowerView',
  props: ['id'],
  data: () => ({
    pureRuns: [],
    impureRuns: [],
  }),
  computed: {
    towerData() {
      return this.$store.state.towers?.[this.id];
    },
  },
  async created() {
    const towerRuns = await fetchTowerRuns(this.id);
    this.pureRuns = towerRuns.filter((run) => (run.pure));
    this.impureRuns = towerRuns.filter((run) => (run.impure));
  },
};
