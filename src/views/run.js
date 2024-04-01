import _ from 'lodash';
import { fetchRun } from '../scripts/api';
import { calcClear } from '../scripts/tower';

export default {
  name: 'Run',
  data: () => ({
    hasLoaded: false,
    runData: null,
  }),
  props: ['id'],
  async created() {
    const runData = await fetchRun(this.id);
    if (!runData) { this.$router.push({ path: '/' }); return; }
    /* Also probably better solution available */
    runData.resourceUse.legacies = JSON.parse(runData.resourceUse.legacies);
    this.runData = runData;

    // populated initial data
    this.hasLoaded = true;
  },
  computed: {
    tower() {
      return this.$store.state.towers?.[this.runData?.towerId];
    },
    player() {
      return this.runData?.player;
    },
    playerRoute() {
      return `/player/${this.player?.id}`;
    },
    editRoute() {
      return `/run/edit/${this.id}`;
    },
    canEdit() {
      return this.$store.state.userProfile?.role === 'ADMIN' || this.player?.id === this.$store.state.userProfile?.id;
    },
    clear() {
      return calcClear(this.runData);
    },
    legacyRun() {
      return this.runData?.isLegacy;
    },
    usedLegacies() {
      let counts = _.map(this.$store.state?.legacies, (el) => ({ id: el.id, count: this.runData?.resourceUse?.legacies?.[el.id] || 0 }));
      counts = _.filter(counts, (el) => el.count > 0);
      return counts;
    },
  },
};
