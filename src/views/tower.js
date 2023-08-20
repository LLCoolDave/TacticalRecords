import _ from 'lodash';
import { fetchTowerRuns } from '../scripts/api';

export default {
  name: 'TowerView',
  props: ['id'],
  data: () => ({
    pureRuns: [],
    impureRuns: [],
    personalRecords: true,
    legacyScores: false,
  }),
  methods: {
    filterToRecords(runs) {
      return _.uniqBy(runs, (run) => run.playerId);
    },
    filterLegacy(runs) {
      return _.filter(runs, (run) => !run.isLegacy);
    },
    filterRuns(runs) {
      let retRuns = runs;
      if (!this.legacyScores) {
        retRuns = this.filterLegacy(retRuns);
      }
      if (this.personalRecords) {
        retRuns = this.filterToRecords(retRuns);
      }
      return retRuns;
    },
  },
  computed: {
    towerData() {
      return this.$store.state.towers?.[this.id];
    },
    thresholds() {
      /* there's probably a clever way to do this, but with custom sorting and display mapping this might be best left alone */
      const scores = [];
      const towerThresh = this.towerData.thresholds;
      if (towerThresh?.overscore) scores.push({ value: `+${towerThresh.overscore}`, icon: 'sunstone' });
      _.map(['sun', 'moon', 'diamond', 'platinum', 'gold', 'silver', 'bronze'], (medal) => { if (towerThresh?.[medal]) scores.push({ value: towerThresh?.[medal], icon: medal }); });
      return scores;
    },
    pureRunsDisplay() {
      return this.filterRuns(this.pureRuns);
    },
    impureRunsDisplay() {
      return this.filterRuns(this.impureRuns);
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
