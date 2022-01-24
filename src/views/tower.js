import _ from 'lodash';
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
    thresholds() {
      return _.mapKeys(_.omitBy(this.towerData.thresholds, (value) => value == null), (value, key) => { if (key === 'overscore') return 'sunstone'; return key; });
    },
  },
  async created() {
    const towerRuns = await fetchTowerRuns(this.id);
    this.pureRuns = towerRuns.filter((run) => (run.pure));
    this.impureRuns = towerRuns.filter((run) => (run.impure));
  },
};
