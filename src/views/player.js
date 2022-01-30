import _ from 'lodash';
import { fetchPlayerRecords, fetchMostRecentRuns } from '../scripts/api';

export default {
  name: 'PlayerView',
  data: () => ({
    hasLoaded: false,
    player: null,
    pureRecords: null,
    impureRecords: null,
    latest: [],
  }),
  props: ['id'],
  async created() {
    const playerRecords = await fetchPlayerRecords(this.id);
    this.player = playerRecords.player;
    this.pureRecords = playerRecords.pure.reduce((obj, item) => {
      // eslint-disable-next-line no-param-reassign
      obj[item.towerId] = item;
      return obj;
    }, {});
    this.impureRecords = playerRecords.impure.reduce((obj, item) => {
      // eslint-disable-next-line no-param-reassign
      obj[item.towerId] = item;
      return obj;
    }, {});
    fetchMostRecentRuns({ player: this.id, count: 30 }).then((runs) => { this.latest = runs; });
    this.hasLoaded = true;
  },
  methods: {
    towerById(id) {
      return this.$store.state.towers?.[id];
    },
    formatDate(time) {
      const date = new Date(time);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric', day: 'numeric' });
    },
  },
  computed: {
    towers() {
      return _.map(this.$store.state.towerOrder, (id) => this.$store.state.towers?.[id]);
    },
  },
};
