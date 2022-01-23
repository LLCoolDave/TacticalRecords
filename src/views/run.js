import { fetchRun } from '../scripts/api';

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
  },
};
