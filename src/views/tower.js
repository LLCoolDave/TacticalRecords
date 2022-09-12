import _ from 'lodash';
import { fetchTowerRuns } from '../scripts/api';

export default {
  name: 'TowerView',
  props: ['id'],
  data: () => ({
    pureRuns: [],
    impureRuns: [],
    personalRecords: true,
  }),
  computed: {
    towerData() {
      return this.$store.state.towers?.[this.id];
    },
    thresholds() {
      /* there's probably a clever way to do this, but with custom sorting and display mapping this might be best left alone */
      const scores = [];
      const towerThresh = this.towerData.thresholds;
      if (towerThresh?.overscore) scores.push({ value: `+${towerThresh.overscore}`, icon: 'sunstone' });
      _.map(['moon', 'diamond', 'platinum', 'gold', 'silver', 'bronze'], (medal) => { if (towerThresh?.[medal]) scores.push({ value: towerThresh?.[medal], icon: medal }); });
      return scores;
    },
    pureRunsDisplay() {
      return this.personalRecords ? _.uniqBy(this.pureRuns, (run) => run.playerId) : this.pureRuns;
    },
    impureRunsDisplay() {
      return this.personalRecords ? _.uniqBy(this.impureRuns, (run) => run.playerId) : this.impureRuns;
    },
    hasImpure() {
      return !this.towerData?.hasNoImpure;
    },
  },
  async created() {
    const towerRuns = await fetchTowerRuns(this.id);
    this.impureRuns = towerRuns.impure;
    this.pureRuns = towerRuns.pure;
  },
};
